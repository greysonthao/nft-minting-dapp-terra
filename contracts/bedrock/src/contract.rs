#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdError,
    StdResult,
};

use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};
use crate::state::Extension;
use cw2::set_contract_version;
use cw721::ContractInfoResponse;
pub use cw721_base::{Cw721Contract, MintMsg, MinterResponse};

use crate::execute::{execute_mint, execute_withdraw};

use crate::query::{check_royalties, query_config, query_frozen, query_name, query_royalties_info};
use crate::state::{Config, RoyaltiesInfo, CONFIG, OWNER, ROYALTIES_INFO};

use crate::{error::ContractError, execute::execute_burn};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:terra-cw721-with-royalties";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    // a little sense check for somebody attempting something strange
    if msg.royalty_payments
        && (msg.royalty_percentage.is_none() || msg.royalty_payment_address.is_none())
    {
        return Err(StdError::NotFound {
            kind: String::from(
                "royalty_percentage and royalty_payment_address not set for this contract",
            ),
        });
    }

    if msg.royalty_payments
        && (msg.royalty_percentage.is_some() || msg.royalty_payment_address.is_some())
    {
        let payment_address = match msg.royalty_payment_address {
            Some(addr) => Some(deps.api.addr_validate(&addr)?),
            None => None,
        };

        println!("payment address: {:?}", payment_address);

        let royalty_percentage_valid = match msg.royalty_percentage {
            Some(x) => x > 0 && x <= 100,
            None => false,
        };

        println!("valid or not: {}", royalty_percentage_valid);

        //if the code gets here, that measn the payment_address is a valid Terra address
        //so check to make sure the royalty percentage is =< 100 and if yes, then save the royalty info
        //if royalty info is above 100, then send back an error
        if royalty_percentage_valid {
            let royalties_info = RoyaltiesInfo {
                royalty_payments: msg.royalty_payments,
                //TO DO: fix this unwrap stuff
                royalty_percentage: msg.royalty_percentage.unwrap(),
                royalty_payment_address: payment_address.unwrap(),
            };
            ROYALTIES_INFO.save(deps.storage, &royalties_info)?;
        } else {
            return Err(StdError::GenericErr {
                msg: String::from(
                    "Error: royalty_percentage cannot be less than 0 or more than 100",
                ),
            });
        }
    }

    let cw721_contract = Cw721Contract::<Extension, Empty>::default();
    let config = Config {
        name: msg.name.clone(),
        symbol: msg.symbol.clone(),
        price: msg.price,
        treasury_account: msg.treasury_account,
        start_time: msg.start_time,
        end_time: msg.end_time,
        token_supply: msg.max_token_count,
        frozen: false,
        is_mint_public: msg.is_mint_public,
    };

    let contract_info = ContractInfoResponse {
        name: msg.name.clone(),
        symbol: msg.symbol.clone(),
    };

    cw721_contract
        .contract_info
        .save(deps.storage, &contract_info)?;

    CONFIG.save(deps.storage, &config)?;
    OWNER.save(deps.storage, &info.sender.to_string())?;

    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        // Destroys the NFT permanently.
        ExecuteMsg::Burn { token_id } => execute_burn(deps, env, info, token_id),

        // Mint token
        ExecuteMsg::Mint(mint_msg) => execute_mint(deps, env, info, mint_msg),

        // Withdraw funds to
        ExecuteMsg::Withdraw { amount } => execute_withdraw(deps, env, info, amount),

        // CW721 methods
        _ => Cw721Contract::<Extension, Empty>::default()
            .execute(deps, env, info, msg.into())
            .map_err(|err| err.into()),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::RoyaltyInfo {
            token_id,
            sale_price,
        } => to_binary(&query_royalties_info(deps, token_id, sale_price)?),
        QueryMsg::CheckRoyalties {} => to_binary(&check_royalties(deps)?),
        QueryMsg::Config {} => to_binary(&query_config(deps)?),
        QueryMsg::Frozen {} => to_binary(&query_frozen(deps)?),
        QueryMsg::Name {} => to_binary(&query_name(deps)?),
        // CW721 methods
        _ => Cw721Contract::<Extension, Empty>::default().query(deps, env, msg.into()),
    }
}

/* #[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(
    deps: DepsMut,
    _env: Env,
    msg: MigrateMsg<Config>,
) -> Result<Response, ContractError> {
    match msg {
        MigrateMsg { version, config } => try_migrate(deps, version, config),
    }
}

fn try_migrate(
    deps: DepsMut,
    version: String,
    config: Option<Config>,
) -> Result<Response, ContractError> {
    let contract_version = get_contract_version(deps.storage)?;
    set_contract_version(deps.storage, contract_version.contract, version)?;

    if config.is_some() {
        CONFIG.save(deps.storage, &config.unwrap())?
    }

    Ok(Response::new()
        .add_attribute("method", "try_migrate")
        .add_attribute("version", contract_version.version))
} */

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    match msg {
        MigrateMsg {} => try_migrate(),
    }
}

fn try_migrate() -> Result<Response, ContractError> {
    Ok(Response::new().add_attribute("method", "try_migrate"))
}
