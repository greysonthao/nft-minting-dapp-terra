use cosmwasm_std::{Deps, StdError, StdResult};
use percentage::Percentage;

use crate::{
    msg::{CheckRoyaltiesResponse, RoyaltiesInfoResponse},
    state::{Config, CONFIG, ROYALTIES_INFO},
};

pub fn query_config(deps: Deps) -> StdResult<Config> {
    CONFIG.load(deps.storage)
}

pub fn query_frozen(deps: Deps) -> StdResult<bool> {
    let config = CONFIG.load(deps.storage)?;
    Ok(config.frozen)
}

// NOTE: default behaviour here is to round down
// EIP2981 specifies that the rounding behaviour is at the discretion of the implementer
pub fn query_royalties_info(
    deps: Deps,
    _token_id: String,
    sale_price: u128,
) -> StdResult<RoyaltiesInfoResponse> {
    let royalties_info = ROYALTIES_INFO.load(deps.storage)?;

    // if not configured, throw straight away
    if !royalties_info.royalty_payments {
        return Err(StdError::NotFound {
            kind: String::from("Royalties not set for this contract"),
        });
    }

    // these set defaults but will never be returned if royalty_payments is not configured
    let royalty_percentage = Percentage::from(royalties_info.royalty_percentage);

    let royalty_from_sale_price = royalty_percentage.apply_to(sale_price);

    let royalty_address = royalties_info.royalty_payment_address.to_string();

    Ok(RoyaltiesInfoResponse {
        address: royalty_address,
        royalty_amount: royalty_from_sale_price,
    })
}

pub fn check_royalties(deps: Deps) -> StdResult<CheckRoyaltiesResponse> {
    let royalties_info = ROYALTIES_INFO.load(deps.storage)?;
    Ok(CheckRoyaltiesResponse {
        royalty_payments: royalties_info.royalty_payments,
    })
}

//DELETE LATER
pub fn query_name(deps: Deps) -> StdResult<String> {
    let config = CONFIG.load(deps.storage)?;
    Ok(config.name)
}
