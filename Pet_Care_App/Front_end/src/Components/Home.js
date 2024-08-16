import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import banner1 from "../images/banner1.png";
import "../styles/Home.css";
import Layout from "./Layout";

const Home = () => {

  return (
    <Layout>
      <Container className="container">
        <div className="home" style={{ backgroundImage: `url(${banner1})` }}>
          <div className="headerContainer">
            <h1>Welcome to Pet Care</h1>
            <p>Your one-stop solution for all pet care needs</p>
            <Button variant="contained" color="secondary" component={Link} to="/service">
              Explore Services
            </Button>
          </div>
        </div>
        <Typography variant="h4" gutterBottom sx={{marginBottom:'30px'}}>
                  Our Services
                </Typography>
        <Grid container spacing={4} justifyContent="center" className="grid-row">
       
          <Grid item xs={12} sm={6} md={4}>
            <Card className="service-card hover-card">
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom className="service-card-title">
                  Animal Rescue
                </Typography>
                <Typography   paragraph>
                At Pet Care, we are dedicated to ensuring the safety and well-being of all animals. Our Pet Rescue Service is here to provide immediate help to pets in distress, offering them a chance at a better life. Whether it's a stray in need of a home or an injured animal requiring medical attention, our team is ready to assist.
                </Typography>
            
              
              </CardContent>
            </Card>
          </Grid>
          
        
          <Grid item xs={12} sm={6} md={4}>
            <Card className="service-card hover-card">
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom className="service-card-title">
                  Ownership Transfer
                </Typography>
                <Typography   paragraph>
                Welcome to our Pet Ownership Transfer Service! At Pet Care, we understand that sometimes life circumstances change, and you may need to transfer the ownership of your beloved pet. Whether you are moving, experiencing changes in your personal situation, or finding it difficult to provide the care your pet needs, we are here to help ensure a smooth and responsible transition.
                </Typography>
             
              </CardContent>
            </Card>
          </Grid>

         
          <Grid item xs={12} sm={6} md={4}>
            <Card className="service-card hover-card">
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom className="service-card-title">
                  Pet Sitting
                </Typography>
                <Typography  paragraph>
                At Pet Care, we understand how important your pets are to you, and we are here to provide the best care for them when you are away. Our dedicated team of professional pet sitters ensures that your furry friends receive the love and attention they deserve in a safe and comfortable environment.
                </Typography>
              
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        <Container className="aboutUsSection">
          <Typography variant="h5" align="center" gutterBottom id="about">About Us</Typography>
          <Box mt={2} textAlign="center">
            <Typography paragraph>
              At Pet Care, we are passionate about providing the highest quality of care for your beloved pets. Our team of experienced professionals is dedicated to ensuring that every pet receives the love, attention, and expert care they deserve.
            </Typography>
            <Typography variant="body1" paragraph>
              Our services range from pet sitting and rescue operations to assisting with pet ownership transfers. We are committed to making a positive impact on the lives of pets and their owners by offering reliable and compassionate support.
            </Typography>
            <Typography >
              Our mission is to create a safe and nurturing environment where pets can thrive. Whether you're looking for temporary care for your pet, need assistance with rescue efforts, or require help with transferring pet ownership, we are here to help.
            </Typography>
          </Box>
        </Container>
      </Container>
    </Layout>
  );
};

export default Home;
