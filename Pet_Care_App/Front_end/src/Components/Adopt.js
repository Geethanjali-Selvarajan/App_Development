import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Paper, Card, CardMedia, CardContent,TextField } from '@mui/material';
import Slider from 'react-slick';
import Layout from './Layout.js';
import '../styles/Adopt.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Adopt = () => {
  const [adoptablePets, setAdoptablePets] = useState([]);
  const [preferredPet, setPreferredPet] = useState({ name: '', id: '' });
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    email: '',
    address: '',
    reason: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdoptablePets = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/Ownership-Transfer');
        setAdoptablePets(response.data);
      } catch (err) {
        console.error('Failed to fetch adoptable pets:', err);
      }
    };

    fetchAdoptablePets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdoptClick = (pet) => {
    setPreferredPet({ name: pet.petName, id: pet.id });
    window.scrollTo(0, document.getElementById('adoption-form').offsetTop);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/Adopt', {
        ...formData,
        petId: preferredPet.id,
      });
      setMessage('Application submitted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      setMessage('');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Layout>
      <Container className="rescue">
        <Box textAlign="center" marginBottom={4} className="rescue-box">
          <Typography variant="h3" className="rescue-heading">
            Adoption Services
          </Typography>
          <Typography variant="body1" paragraph>
            Connecting pets with loving families for a lifetime of companionship. Find your perfect match today.
          </Typography>
        </Box>

        <Box className="adoptable-pets-section">
          <Slider {...settings}>
            {adoptablePets.map((pet) => (
              <Card className="pet-card" key={pet.id}>
                {pet.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/jpeg;base64,${pet.image}`}
                    alt={`${pet.petName} image`}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {pet.petName} (ID: {pet.id})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Breed: {pet.petBreed} | Age: {pet.petAge}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {pet.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAdoptClick(pet)}
                    className="adopt-button"
                  >
                    Adopt
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Slider>
        </Box>

        <Container maxWidth="md" className="adopt-container">
          <Paper elevation={3} className="adopt-paper">
            <Box id="adoption-form" className="form-section">
              <Typography variant="h4" gutterBottom>
                Adoption Form
              </Typography>
              {message && <Typography variant="h6" color="success">{message}</Typography>}
              {error && <Typography variant="h6" color="error">{error}</Typography>}
              <form className="adoption-form" onSubmit={handleSubmit}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  color="secondary"
                />
                <TextField
                  label="Your Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
                  color="secondary"
                />
                <TextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  color="secondary"
                />
                <TextField
                  label="Preferred Pet (Name/ID)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="preferredPet"
                  value={`${preferredPet.name} (ID: ${preferredPet.id})`}
                  color="secondary"
                  disabled
                />
                <TextField
                  label="Your Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  color="secondary"
                />
                <TextField
                  label="Why do you want to adopt this pet?"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  color="secondary"
                />
                <Box textAlign="center" marginTop={2}>
                  <Button variant="contained" color="secondary" type="submit">
                    Submit Application
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Container>
      </Container>
    </Layout>
  );
}

export default Adopt;
