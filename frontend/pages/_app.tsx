import {
  getChainOptions,
  StaticWalletProvider,
  WalletControllerChainOptions,
  WalletProvider,
} from "@terra-money/wallet-provider";
import { AppProps } from "next/app";
import Link from "next/link";
import React from "react";
import "../styles/globals.css";

export default function App({
  Component,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) {
  return typeof window !== "undefined" ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      <Component />
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      <Component />
    </StaticWalletProvider>
  );
}

App.getInitialProps = async () => {
  const chainOptions = await getChainOptions();
  return {
    ...chainOptions,
  };
};
