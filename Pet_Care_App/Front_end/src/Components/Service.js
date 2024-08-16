import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner2 from "../images/banner2.jpg";
import serviceImage1 from "../images/service1.jpg";
import serviceImage2 from "../images/service2.jpg";
import serviceImage3 from "../images/service3.jpg"; 
import '../styles/Service.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Delete } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography, Card, CardContent, IconButton, TextField } from '@mui/material';

import Layout from "./Layout";

const Service = () => {
  const [reviews, setReviews] = useState([
   
  ]);

  const [newReview, setNewReview] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews"));
    if (storedReviews) {
      setReviews(storedReviews);
    }
  }, []);

  const handleAddReview = () => {
    if (newReview.trim() && newAuthor.trim()) {
      const updatedReviews = [...reviews, { text: newReview, author: newAuthor }];
      setReviews(updatedReviews);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
      setNewReview("");
      setNewAuthor("");
    }
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  return (
    <Layout>
      <Container className="container">
        <div className="home" style={{ backgroundImage: `url(${banner2})` }}>
          <div className="headerContainer" style={{ backgroundSize: "cover", backgroundPosition: "center", height: "100vh", width: "220vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", textAlign: "center", color: "white" }}>
            <h1>Pet Services</h1>
            <p>Your one-stop solution for all pet care needs</p>
            <Button variant="contained" color="secondary" component={Link} to="/rescue" size="large">Report</Button>
          </div>
        </div>
        <Container className="servicesSection" >
          <Grid container spacing={4} style={{alignItems:"center"}}>
            <Grid item xs={12} md={4} >
              <Box className="serviceBox" >
                <Link to="/sitting">
                  <img src={serviceImage1} alt="Pet Grooming" style={{ width: '100%', borderRadius: '8px' }} />
                </Link>
                <Typography variant="h5">Pet Sitting</Typography>
                <Typography>Welcome to our Pet Sitting Service! At Pet Care, we understand how important your pets are to you, and we are here to provide the best care for them when you are away. Our dedicated team of professional pet sitters ensures that your furry friends receive the love and attention they deserve in a safe and comfortable environment.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} style={{alignItems:"center"}}>
              <Box className="serviceBox">
                <Link to="/rescue">
                  <img src={serviceImage3} alt="Veterinary Care" style={{ width: '100%', borderRadius: '8px', height: '60%' }} />
                </Link>
                <Typography variant="h5">Rescue</Typography>
                <Typography>At Pet Care, we are dedicated to ensuring the safety and well-being of all animals. Our Pet Rescue Service is here to provide immediate help to pets in distress, offering them a chance at a better life. Whether it's a stray in need of a home or an injured animal requiring medical attention, our team is ready to assist.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} style={{alignItems:"center"}}>
              <Box className="serviceBox">
                <Link to="/transfer">
                  <img src={serviceImage2} alt="Veterinary Care" style={{ width: '100%', borderRadius: '8px', height: '60%' }} />
                </Link>
                <Typography variant="h5">Ownership Transfer</Typography>
                <Typography>Welcome to our Pet Ownership Transfer Service! At Pet Care, we understand that sometimes life circumstances change, and you may need to transfer the ownership of your beloved pet. Whether you are moving, experiencing changes in your personal situation, or finding it difficult to provide the care your pet needs, we are here to help ensure a smooth and responsible transition.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container className="reviewsSection">
        <Typography variant="h5" align="center" gutterBottom>Customer Reviews</Typography>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <Card key={index} className="reviewCard">
              <CardContent>
                <IconButton style={{ position: "absolute", top: 10, left: 10 }} onClick={() => handleDeleteReview(index)}>
                  <Delete />
                </IconButton>
                <Typography variant="body1" style={{ marginBottom: 10 }}>
                  "{review.text}"
                </Typography>
                <Typography variant="body2">- {review.author}</Typography>
              </CardContent>
            </Card>
          ))}
        </Slider>
        <Box className="addReviewSection">
          <TextField
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
            fullWidth
            color="secondary"
            multiline
            rows={4}
            variant="outlined"
            style={{ marginBottom: 10 }}
          />
          <TextField
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Your name..."
            fullWidth
            color="secondary"
            variant="outlined"
            style={{ marginBottom: 10 }}
          />
          <Button variant="contained" color="secondary" onClick={handleAddReview}>
            Submit Review
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Service;
