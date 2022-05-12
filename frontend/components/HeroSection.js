/* eslint-disable @next/next/no-img-element */
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import heroImage from "../images/hero.png";
import Container from "@mui/material/Container";
import MintPageButton from "./MintPageButton";
import BigMintPageButton from "./BigMintPageButton";
import Box from "@mui/material/Box";
import Link from "next/link";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";

export default function HeroSection() {
  return (
    <div>
      <Paper
        square={true}
        sx={{
          height: "100vh",
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
              <MintPageButton />
            </Box>
          </Box>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            textAlign="left"
            color="white"
            padding="8rem 2rem 2rem 2rem"
            fontFamily="'Chewy', cursive"
          >
            Playful Ponies
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            textAlign="left"
            color="white"
            marginLeft="2rem"
          >
            A collection of 5,555 adorable NFTs —
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            textAlign="left"
            color="white"
            paddingBottom="3rem"
            marginLeft="2rem"
          >
            digital ponies frolicking on the{" "}
            <Box component="span">
              <img
                src="https://assets.terra.money/icon/svg/Terra.svg"
                alt="terra logo"
                width="20px"
              />
            </Box>
            &nbsp;Terra blockchain.
          </Typography>
          <Box display="flex" justifyContent="center" marginTop="1.5rem">
            <BigMintPageButton />
          </Box>
        </Container>
      </Paper>
    </div>
  );
}
