import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

export default function SimpleAccordion() {
  return (
    <Box margin="0 0 6rem 0">
      <Typography
        variant="h3"
        component="h4"
        textAlign="center"
        margin="0 0 1rem 0"
        fontWeight="bold"
        fontFamily="'Chewy', cursive"
      >
        Frequently Asked Questions
      </Typography>
      <Accordion sx={{ backgroundColor: "#222da0", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="bold" fontSize="1.25rem">
            Is there a Discord?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes. However, we're doing things a bit different. We will not have a
            public Discord server. Instead, we'll have a private Discord for
            Playful Pony holders only. This is where you will be able to connect
            with like-minded individuals who want to encourage children to
            create on the blockchain.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "#222da0", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography fontWeight="bold" fontSize="1.25rem">
            What are the maximum mints per wallet?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Three mints per wallet will be allowed.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "#222da0", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography fontWeight="bold" fontSize="1.25rem">
            What intellectual property rights do Playful Pony holders receive?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Owners of Playful Ponies have full commercial art rights for the
            Ponies they own. Full details coming soon (prior to launch).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "#222da0", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography fontWeight="bold" fontSize="1.25rem">
            What are the funds being used for?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            10% of proceeds go toward horse rehabilitation efforts as well as
            other causes. The rest of the proceeds go to Laluna LLC, a web3
            media company. We have big plans and this funding will be used to
            encourage children to create on the blockchain.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "#222da0", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography fontWeight="bold" fontSize="1.25rem">
            What are secondary royalties and how will they be used?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Laluna LLC will receive 5% of all secondary sales. These proceeds
            will be used to continue to fund operations and deliver even more
            value to our community.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "#222da0", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel6a-content"
          id="panel6a-header"
        >
          <Typography fontWeight="bold" fontSize="1.25rem">
            Will Playful Ponies be revealed right away?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you will immediately know what your new friend looks like!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
