/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export default function BigMintPageButton() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[400]),
    backgroundColor: "#222da0",
    "&:hover": {
      backgroundColor: purple[600],
    },
  }));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Link href="/mint">
          <a>
            <ColorButton
              sx={{
                borderRadius: "10px",
                margin: "1rem 0 0 0",
                padding: "1rem 2rem 1rem 2rem",
              }}
              variant="contained"
            >
              <Box component="span" display="flex" alignItems="center">
                <Typography
                  variant="body1"
                  component="span"
                  textTransform="none"
                  margin="0 1rem 0 1rem"
                  fontWeight="bold"
                >
                  Mint Your NFT
                </Typography>
              </Box>
            </ColorButton>
          </a>
        </Link>
      </Box>
    </Box>
  );
}
