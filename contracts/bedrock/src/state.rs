use cosmwasm_std::{Addr, Coin};
use cw_storage_plus::Item;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    /// Name of the collection
    pub name: String,
    /// Symbol for the collection
    pub symbol: String,
    /// Cost of minting if public
    pub price: Option<Coin>,
    /// Address to withdraw funds to
    pub treasury_account: String,
    /// Time when minting becomes available
    pub start_time: Option<u64>,
    /// Time when minting becomes unavailable
    pub end_time: Option<u64>,
    /// Maximum number of tokens to mint
    pub token_supply: u64,
    /// Whether NFTs can be updated
    pub frozen: bool,
    /// Whether minting is public
    pub is_mint_public: bool,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const OWNER: Item<String> = Item::new("owner");
//changed String to Addr to confirm that the owner address is valid
/* pub const OWNER: Item<Addr> = Item::new("owner"); */

pub type Extension = Option<Metadata>;

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct Trait {
    pub display_type: Option<String>,
    pub trait_type: String,
    pub value: String,
}

// see: https://docs.opensea.io/docs/metadata-standards
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct Metadata {
    pub image: Option<String>,
    pub image_data: Option<String>,
    pub external_url: Option<String>,
    pub description: Option<String>,
    pub name: Option<String>,
    pub attributes: Option<Vec<Trait>>,
    pub background_color: Option<String>,
    pub animation_url: Option<String>,
    pub youtube_url: Option<String>,
}

// Royalties from envoylabs: https://github.com/envoylabs/cw2981-contract-wide-royalties/blob/e45a8cdf8d570e073af205b6d0800eebdbb12618/src/state.rs
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct RoyaltiesInfo {
    pub royalty_payments: bool,
    /// This is how much the minter takes as a cut when sold
    pub royalty_percentage: u32,
    /// The payment address, may be different to or the same
    /// as the minter addr
    pub royalty_payment_address: Addr,
}

pub const ROYALTIES_INFO: Item<RoyaltiesInfo> = Item::new("royalties_info");
