import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box padding="6rem 0 12rem 0" sx={{ backgroundColor: "#222da0" }}>
      <Container maxWidth="lg">
        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "white",
            },
          }}
        >
          <BedroomBabyIcon sx={{ color: "white" }} />
        </Divider>
        <Box>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ color: "white" }}
            fontFamily="'Chewy', cursive"
          >
            Playful Ponies
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: "white" }}
          >
            © 2022 Laluna LLC
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
