module.exports = ({ wallets, client }) => ({
  getConfig: () => client.query("bedrock", { config: {} }),
  getFrozen: () => client.query("bedrock", { frozen: {} }),
  getName: () => client.query("bedrock", { name: {} }),
  getNumTokens: () => client.query("bedrock", { num_tokens: {} }),
  checkRoyalties: () => client.query("bedrock", { check_royalties: {} }),
  getOwnerOf: (token_id) => client.query("bedrock", { owner_of: { token_id } }),
  getRoyaltyInfo: (sale_price, token_id) =>
    client.query("bedrock", { royalty_info: { sale_price, token_id } }),
  mintNFT: (owner, token_id, token_uri, signer = wallets.test1) =>
    client.execute(signer, "bedrock", {
      mint: { owner, token_id, token_uri },
    }),
});
