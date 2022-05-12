/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Container from "@mui/material/Container";
import MintBox from "../components/MintBox";
import Paper from "@mui/material/Paper";
import backgroundImage from "../images/background.png";
import Link from "next/link";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";
import ConnectWalletButton from "../components/ConnectWalletButton";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Mint() {
  const matches = useMediaQuery("(max-width:500px)");

  const styles1 = {
    height: "110vh",
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const styles2 = {
    height: "100vh",
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      <Head>
        <title>Playful Ponies NFTs - Mint</title>
        <meta
          name="description"
          content="Mint your one of a kind Playful Ponies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Paper square={true} sx={matches ? styles1 : styles2}>
          <Container maxWidth="lg">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link href="/">
                <a>
                  <BedroomBabyIcon
                    fontSize="large"
                    sx={{
                      color: "white",
                      marginLeft: "1rem",
                      marginTop: "1rem",
                    }}
                  />
                </a>
              </Link>
              <Box marginRight="1rem">
                <ConnectWalletButton />
              </Box>
            </Box>
            <MintBox />
          </Container>
        </Paper>
      </div>
    </div>
  );
}
