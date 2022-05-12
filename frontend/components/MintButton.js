/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export default function MintButton(props) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[400]),
    backgroundColor: "#222da0",
    "&:hover": {
      backgroundColor: purple[600],
    },
  }));

  /*   const handleClick = () => {
    console.log("Mint button was clicked");
  }; */

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <ColorButton
          onClick={() => props.submitMint()}
          sx={{ borderRadius: "20px", margin: "1rem 0 0 0" }}
          variant="contained"
        >
          <Typography
            variant="body1"
            component="span"
            textTransform="none"
            margin="0 1rem 0 1rem"
          >
            MINT
          </Typography>
        </ColorButton>
      </Box>
    </Box>
  );
}
