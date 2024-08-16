import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import { Box, Typography } from "@mui/material";
import '../styles/Footer.css';
const Footer = () => {
  return (
    <>
      <Box
        sx={{  bgcolor: "white", color: "purple", p: 3 }}
      >
        <Box
          sx={{
            my: 3,
            textAlign: "right",
            "& svg": {
              fontSize: "60px",
              cursor: "pointer",
              mr: 2,
            },
            "& svg:hover": {
              color: "white",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
          >
          <Typography sx={{textAlign: "left",
        fontSize:"20px" }}>
             <Typography variant="h5" color="inherit" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="inherit">
              123 Main Street, Coimbatore, India
            </Typography>
            <Typography variant="body2" color="inherit">
              Email: petcare@gmail.com
            </Typography>
            <Typography variant="body2" color="inherit">
              Phone: +91 9876543210
            </Typography>

          </Typography>
          {/* icons */}
          <InstagramIcon />
          <TwitterIcon />
          <FacebookIcon />
        </Box>
        
      </Box>
    </>
  );
};

export default Footer;
