import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, Button, TextField, Paper, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGeolocated } from 'react-geolocated';
import Layout from './Layout.js';
import sittingImage from '../images/petsitting.avif';
import '../styles/Sitting.css';
const CustomButton = styled(Button)({
  backgroundColor: '#6a0dad',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4b0082',
  },
});

const Sitting = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [petType, setPetType] = useState('');
  const [owner, setOwner] = useState('');
  const [mobile, setMobile] = useState('');
  const [breed, setBreed] = useState('');
  const [instruction, setInstruction] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const petSittingData = {
      ownerName: owner,
      mobileNum: mobile,
      petType: petType,
      breed: breed,
      startDate: startDate,
      endDate: endDate,
      specialInstructions: instruction,
      location: location,
    };

    try {
      const response = await axios.post('http://localhost:8082/api/pet-sitting', petSittingData);
      setSuccess('Pet sitting request submitted successfully!');
      console.log('Response:', response.data);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
         src={sittingImage}
           alt="Pet Sitting Service"
          style={{ width: '1100px', height: '500px', borderRadius: '8px' }}
        />
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
          <Typography variant="h2" gutterBottom sx={{  fontWeight: 'bold',color:'purple'}}>
            Pet Sitting Service
          </Typography>
          <Typography variant="h5" gutterBottom sx={{color:'white'}}>
            We provide professional pet sitting services to take care of your pets when you are away.
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="md"  sx={{ padding: '20px', backgroundColor: '#f3e5f5', color: '#4a0072',marginTop:'60px',marginBottom:'50px' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
    <Typography variant='h5' sx={{color:'purple'}}>We’re here to make your pet feel at home. Please fill out the pet sitting form.</Typography>
          <Box sx={{ marginTop: '20px' }}>
            <Box sx={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #6a0dad', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Owner Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="secondary"
                  onChange={(e) => setOwner(e.target.value)}
                />
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
                  color="secondary"
                  onChange={(e) => setMobile(e.target.value)}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel color="secondary">Type of Pet</InputLabel>
                  <Select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    color="secondary"
                  >
                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="bird">Bird</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Breed of Pet"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="secondary"
                  onChange={(e) => setBreed(e.target.value)}
                />
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: startDate || today }}
                />
                <TextField
                  label="Special Instructions"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  onChange={(e) => setInstruction(e.target.value)}
                  color="secondary"
                />
                <TextField
                  label="Location (Address)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="secondary"
                  value={location}
                  onChange={handleLocationChange}
                />

                <Box textAlign="center" marginTop={2}>
                  {loading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <CustomButton variant="contained" type="submit">
                      Submit Request
                    </CustomButton>
                  )}
                </Box>

                {error && <Alert severity="error" sx={{ marginTop: '20px' }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ marginTop: '20px' }}>{success}</Alert>}
              </form>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Sitting;
