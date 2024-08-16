import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Container, Typography, Box, Button, Input, TextField, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from './Layout.js';
import '../styles/Transfer.css';
import transferImage from '../images/owner.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';

const CustomButton = styled(Button)({
  backgroundColor: '#4a148c',
  color: 'white',
  '&:hover': {
    backgroundColor: '#6a1b9a',
  },
});

const Transfer = () => {
  const [petDetails, setPetDetails] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    petName: '',
    petBreed: '',
    petAge: '',
    description: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/Ownership-Transfer');
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfer details:', error);
      }
    };

    fetchTransfers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...petDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setPetDetails({
      ...petDetails,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('name', petDetails.ownerName);
    formData.append('phoneNo', petDetails.ownerPhone);
    formData.append('emailId', petDetails.ownerEmail);
    formData.append('petName', petDetails.petName);
    formData.append('petBreed', petDetails.petBreed);
    formData.append('petAge', petDetails.petAge);
    formData.append('description', petDetails.description);

    if (petDetails.image) {
      formData.append('image', petDetails.image);
    }

    try {
      const response = await axios.post('http://localhost:8082/api/Ownership-Transfer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Pet details submitted successfully!');
        setPetDetails({
          ownerName: '',
          ownerPhone: '',
          ownerEmail: '',
          petName: '',
          petBreed: '',
          petAge: '',
          description: '',
          image: null,
        });
      } else {
        setError('Failed to submit pet details.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <img src={transferImage} alt="Pet Sitting Service" style={{ width: '1100px', height: '500px' }} />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginBottom: '50px',
            color: 'white',
            p: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" gutterBottom className="transfer-heading" sx={{ color: 'whitesmoke' }}>
            Pet Ownership Transfer
          </Typography>
          <Typography variant="h6" paragraph>
            Our Ownership Transfer service helps pet owners who can no longer care for their pets. We ensure a smooth and compassionate transition to a new home.
          </Typography>
          <NavLink to="/Adopt">
            <Button color="secondary" variant="contained">
              Adopt
            </Button>
          </NavLink>
        </Box>
      </Box>

      <Container maxWidth="md" className="transfer-container">
        <Paper elevation={3} className="transfer-paper">
          <Box className="form-section">
            <Typography variant="h6" paragraph>
              Submit this form to rehome your pet with a new caretaker.
            </Typography>

            <form className="transfer-form" onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                name="ownerName"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                value={petDetails.ownerName}
                color="secondary"
              />
              <TextField
                label="Your Phone Number"
                name="ownerPhone"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                inputProps={{ pattern: '\\d{10}', title: 'Phone number must be 10 digits' }}
                onChange={handleInputChange}
                value={petDetails.ownerPhone}
                color="secondary"
              />
              <TextField
                label="Your Email"
                name="ownerEmail"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                value={petDetails.ownerEmail}
                color="secondary"
              />
              <TextField
                label="Pet's Name"
                name="petName"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                value={petDetails.petName}
                color="secondary"
              />
              <TextField
                label="Pet's Breed"
                name="petBreed"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                value={petDetails.petBreed}
                color="secondary"
              />
              <TextField
                label="Pet's Age"
                name="petAge"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                value={petDetails.petAge}
                color="secondary"
              />
              <TextField
                label="Pet's Description"
                name="description"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                multiline
                rows={4}
                onChange={handleInputChange}
                value={petDetails.description}
                color="secondary"
              />
              <Input
                type="file"
                accept="image/*"
                fullWidth
                margin="normal"
                required
                color="success"
                onChange={handleFileChange}
              />
              <Box textAlign="center" marginTop={2}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <CustomButton variant="contained" type="submit">
                    Submit Application
                  </CustomButton>
                )}
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
                {success && (
                  <Typography variant="body2" color="success">
                    {success}
                  </Typography>
                )}
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Transfer;
