import { LCDClient } from "@terra-money/terra.js";
import { contractAddress } from "./address";

export const getConfig = async (wallet) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  });
  return lcd.wasm.contractQuery(contractAddress(wallet), { config: {} });
};

export const getNumTokens = async (wallet) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  });
  return lcd.wasm.contractQuery(contractAddress(wallet), {
    num_tokens: {},
  });
};

export const getName = async (wallet) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  });
  return lcd.wasm.contractQuery(contractAddress(wallet), {
    name: {},
  });
};

export const getContractInfo = async (wallet) => {
  const lcd = new LCDClient({
    URL: wallet.network.lcd,
    chainID: wallet.network.chainID,
  });
  return lcd.wasm.contractQuery(contractAddress(wallet), {
    contract_info: {},
  });
};

export const getContractAddress = async (wallet) => {
  return contractAddress(wallet).toString();
};
