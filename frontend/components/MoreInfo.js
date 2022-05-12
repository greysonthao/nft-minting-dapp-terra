import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import manyPPs from "../images/many-pp.png";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MoreInfo() {
  const matches = useMediaQuery("(max-width:790px)");

  return (
    <Box margin="8rem 0 0 0">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center">
            <Image
              src={manyPPs}
              alt="many playful ponies"
              width="500px"
              height="500px"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box paddingTop={matches ? "0" : "5rem"}>
            <Typography
              variant="h3"
              component="h3"
              fontFamily="'Chewy', cursive"
            >
              Playful Ponies are just an avatar
            </Typography>
            <Typography variant="body1" component="p" margin="1rem 0 0 0">
              They're a collection of 5,555 utility-enabled PFPs that feature a
              richly diverse and unique pool of rarity-powered traits. What's
              more, each Playful Pony unlocks private club membership and
              additional benefits the longer you hold them.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
