/* eslint-disable @next/next/no-img-element */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import clem from "../images/clem.png";
import jazz from "../images/jazz.png";
import myk from "../images/myk.png";
import vevo from "../images/vevo.png";
import izzy from "../images/izzy.png";
import dad from "../images/dad.png";
import Paper from "@mui/material/Paper";
import Image from "next/image";

export default function AboutUs() {
  return (
    <Box margin="6rem 0 6rem 0">
      <Typography
        variant="h3"
        component="h4"
        textAlign="center"
        fontWeight="bold"
        paddingBottom="2rem"
        fontFamily="'Chewy', cursive"
      >
        The Team
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper padding="1rem" elevation={5}>
            <Box display="flex" justifyContent="center" padding="1rem">
              <Image src={clem.src} alt="C" width="375" height="375" />
            </Box>
            <Typography
              variant="h5"
              component="h6"
              textAlign="center"
              fontWeight="bold"
              fontFamily="'Chewy', cursive"
            >
              Clem
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign="center"
              paddingBottom="1rem"
            >
              I drew the ponies and helped color!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper padding="1rem" elevation={5}>
            <Box display="flex" justifyContent="center" padding="1rem">
              <Image src={jazz.src} alt="J" width="375" height="375" />
            </Box>
            <Typography
              variant="h5"
              component="h6"
              textAlign="center"
              fontWeight="bold"
              fontFamily="'Chewy', cursive"
            >
              Jazz
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign="center"
              paddingBottom="1rem"
            >
              I drew the clothes and backgrounds!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper padding="1rem" elevation={5}>
            <Box display="flex" justifyContent="center" padding="1rem">
              <Image src={myk.src} alt="Myk" width="375" height="375" />
            </Box>
            <Typography
              variant="h5"
              component="h6"
              textAlign="center"
              fontWeight="bold"
              fontFamily="'Chewy', cursive"
            >
              Myk
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign="center"
              paddingBottom="1rem"
            >
              I did everything else!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper padding="1rem" elevation={5}>
            <Box display="flex" justifyContent="center" padding="1rem">
              <Image src={vevo.src} alt="C" width="375" height="375" />
            </Box>
            <Typography
              variant="h5"
              component="h6"
              textAlign="center"
              fontWeight="bold"
              fontFamily="'Chewy', cursive"
            >
              Vevo
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign="center"
              paddingBottom="1rem"
            >
              I cheered them on!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper padding="1rem" elevation={5}>
            <Box display="flex" justifyContent="center" padding="1rem">
              <Image src={izzy.src} alt="J" width="375" height="375" />
            </Box>
            <Typography
              variant="h5"
              component="h6"
              textAlign="center"
              fontWeight="bold"
              fontFamily="'Chewy', cursive"
            >
              Izzy
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign="center"
              paddingBottom="1rem"
            >
              I smiled at my sisters!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper padding="1rem" elevation={5}>
            <Box display="flex" justifyContent="center" padding="1rem">
              <Image src={dad.src} alt="Myk" width="375" height="375" />
            </Box>
            <Typography
              variant="h5"
              component="h6"
              textAlign="center"
              fontWeight="bold"
              fontFamily="'Chewy', cursive"
            >
              Dad
            </Typography>
            <Typography
              variant="body1"
              component="p"
              textAlign="center"
              paddingBottom="1rem"
            >
              I did the tech stuff!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
