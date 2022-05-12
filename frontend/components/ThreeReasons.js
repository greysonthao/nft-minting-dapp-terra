import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import holdInternet from "../images/hold-internet.png";
import art from "../images/art.png";
import future from "../images/future.png";

export default function ThreeReasons() {
  return (
    <Box margin="7rem 0 7rem 0">
      <Typography
        variant="h3"
        component="h4"
        fontWeight="bold"
        textAlign="center"
        marginTop=""
        marginBottom="2rem"
        fontFamily="'Chewy', cursive"
      >
        Why You Should Mint
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <Image src={holdInternet} alt="Own The Internet" />
          </Box>
          <Typography
            variant="h6"
            textAlign="center"
            fontWeight="bold"
            margin="1rem 0 1rem 0"
          >
            Own The IP
          </Typography>
          <Typography variant="body1" component="p" align="justify">
            Playful Pony holders have full commercial art rights for the PP NFTs
            they own. This means you can create a t-shirt shop, print mugs, or
            whatever else your entreprenuerial heart desires.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <Image src={art} alt="Support Young Artists" />
          </Box>
          <Typography
            variant="h6"
            textAlign="center"
            fontWeight="bold"
            margin="1rem 0 1rem 0"
          >
            Support Young Artists
          </Typography>
          <Typography variant="body1" component="p" align="justify">
            When you mint a Playful Pony NFT, you are telling children that they
            can be more than just consumers: they can also be creators.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <Image src={future} alt="Embrace The Future" />
          </Box>
          <Typography
            variant="h6"
            textAlign="center"
            fontWeight="bold"
            margin="1rem 0 1rem 0"
          >
            Embrace The Future
          </Typography>
          <Typography variant="body1" component="p" align="justify">
            By minting and becoming a Playful Pony holder, you will be an early
            adopter of Web3, the next chapter of the internet. Join the party!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
