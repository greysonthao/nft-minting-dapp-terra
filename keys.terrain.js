// can use `process.env.SECRET_MNEMONIC` or `process.env.SECRET_PRIV_KEY`
// to populate secret in CI environment instead of hardcoding
require("dotenv").config();

module.exports = {
  bombay: {
    mnemonic: process.env.SEED_PHRASE,
  },
};
