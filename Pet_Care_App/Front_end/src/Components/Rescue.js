import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, TextField, Paper, Input,
  CircularProgress, Alert, Card, CardContent, CardMedia
} from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { styled } from '@mui/material/styles';
import { useGeolocated } from 'react-geolocated';
import Layout from './Layout.js';
import '../styles/Rescue.css';
import rescueImage from '../images/rescue.jpg';
import L from 'leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;  
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CustomButton = styled(Button)({
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00332c',
  },
});

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const Rescue = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    emailId: '',
    description: '',
    image: null
  });

  const [location, setLocation] = useState({ lat: '', lng: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rescues, setRescues] = useState([]);

  useEffect(() => {
    fetchRescues();
  }, []);

  const fetchRescues = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/Rescue');
      setRescues(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: 'json',
          lat,
          lon: lng,
        },
      });
      return response.data.display_name;
    } catch (err) {
      console.error(err);
      return 'Address not found';
    }
  };

  const handleLocationSelect = async (latlng) => {
    const address = await getAddressFromLatLng(latlng.lat, latlng.lng);
    setLocation({ lat: latlng.lat, lng: latlng.lng, address });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('phoneNo', formData.phoneNo);
    formDataObj.append('emailId', formData.emailId);
    formDataObj.append('location', location.address);
    formDataObj.append('description', formData.description);

    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8082/api/Rescue', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSuccess('Report submitted successfully!');
        fetchRescues(); // Fetch the latest rescues after submission
      } else {
        setError('Failed to submit report');
      }
    } catch (err) {
      setError('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container className="rescue">
        <Box textAlign="center" marginBottom={4} className="rescue-box">
          <Typography variant="h3" className="rescue-heading">
            Report an Animal in Distress
          </Typography>
          <br></br>
          <Typography variant="body1" paragraph>
            Our Pet Rescue Service is here to provide immediate help to pets in distress, offering them a chance at a better life. Whether it's a stray in need of a home or an injured animal requiring medical attention, our team is ready to assist.
          </Typography>
          <img src={rescueImage} alt="Rescue" className="rescue-image" />
        </Box>

        <Container maxWidth="md" className="rescue-container">
          <Paper elevation={3} className="rescue-paper">
            <Box className="form-section">
              <Typography variant="h4" gutterBottom>
                Report Form
              </Typography>
              <Box className="report-form-container">
                <form className="report-form" onSubmit={handleSubmit}>
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="name"
                    color="secondary"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Your Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
                    name="phoneNo"
                    color="secondary"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Your Email Id"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleInputChange}
                    email
                    name="emailId"
                    color="secondary"
                    value={formData.emailId}
                  />
                  <TextField
                    label="Animal Location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    color="secondary"
                    value={location.address}
                    readOnly
                  />
                  {isGeolocationAvailable && isGeolocationEnabled && coords && (
                    <Box marginY={4}>
                      <Typography variant="h6" gutterBottom>
                        Select Animal Location on Map
                      </Typography>
                      <MapContainer center={[coords.latitude, coords.longitude]} zoom={15} style={{ height: '400px' }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationPicker onLocationSelect={handleLocationSelect} />
                      </MapContainer>
                    </Box>
                  )}

                  <TextField
                    label="Animal Condition/Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    multiline
                    rows={4}
                    name="description"
                    color="secondary"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <fieldset>
                    <legend>Upload picture</legend>
                    <Input
                      type="file"
                      accept="image/*"
                      fullWidth
                      margin="normal"
                      required
                      color="secondary"
                      onChange={handleFileChange}
                    />
                  </fieldset>

                  <Box textAlign="center" marginTop={2}>
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <CustomButton variant="contained" type="submit">
                        Submit Report
                      </CustomButton>
                    )}
                  </Box>

                  {error && <Alert severity="error" marginTop={2}>{error}</Alert>}
                  {success && <Alert severity="secondary" marginTop={2}>{success}</Alert>}
                </form>
              </Box>
            </Box>
          </Paper>
        </Container>

      </Container>
       
    </Layout>
  );
};

export default Rescue;
