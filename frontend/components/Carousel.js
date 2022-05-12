/* eslint-disable @next/next/no-img-element */
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import pp1 from "../images/pp-1.png";
import pp2 from "../images/pp-2.png";
import pp3 from "../images/pp-3.png";
import pp4 from "../images/pp-4.png";
import pp5 from "../images/pp-5.png";
import pp6 from "../images/pp-6.png";
import useMediaQuery from "@mui/material/useMediaQuery";

const poniesArray = [pp1, pp2, pp3, pp4, pp5, pp6];

export default function Carousel() {
  const [ponies, setPonies] = React.useState(poniesArray);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const matches = useMediaQuery("(max-width:500px)");

  const handleClickForward = () => {
    if (currentIndex === 5) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleClickBackward = () => {
    if (currentIndex === 0) {
      setCurrentIndex(5);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box margin="7rem 0 7rem 0">
      <Box>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                onClick={handleClickBackward}
                marginRight={matches ? ".1rem" : "5rem"}
                sx={{ cursor: "pointer" }}
              >
                <ArrowBackIosNewIcon fontSize="large" sx={{ color: "white" }} />
              </Box>

              <Box display="flex" justifyContent="center">
                <Paper
                  sx={{ width: 350, height: 350, backgroundColor: "#222da0" }}
                  elevation={0}
                >
                  <img
                    src={ponies[currentIndex].src}
                    alt="Playful Pony"
                    width="100%"
                    height="100%"
                  />
                </Paper>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginBottom="1rem"
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  marginTop="1.5rem"
                ></Typography>
              </Box>
              <Typography variant="h6" textAlign="center"></Typography>
              <Box
                marginLeft={matches ? ".1rem" : "5rem"}
                onClick={handleClickForward}
                sx={{ cursor: "pointer" }}
              >
                <ArrowForwardIosIcon fontSize="large" sx={{ color: "white" }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
