import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    margin: 0,
  },
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '900px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  imageSection: {
    flex: 1.5,
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    order: 2,
  },
  registerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  registerWrapper: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  registerHeader: {
    textAlign: 'center',
    color: 'purple',
    marginBottom: '20px',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  nameFields: {
    display: 'flex',
    gap: '10px',
  },
  nameInput: {
    flex: 1,
  },
  fullWidthInput: {
    width: '100%',
  },
  submitButton: {
    backgroundColor: 'purple',
    color: 'white',
    width: '100%',
  },
  submitButtonHover: {
    backgroundColor: '#6a0dad',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: 'purple',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
     
      axios.post('http://localhost:8082/api/Register-user', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: formData.email,
        password: formData.password
      })
      .then(response => {
        console.log('Registration successful:', response.data);
        navigate('/Login');
      })
      .catch(error => {
        console.error('Registration error:', error);
        
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img
            src="https://media.licdn.com/dms/image/D4D12AQEDEzDgyzjONQ/article-cover_image-shrink_720_1280/0/1682008182186?e=2147483647&v=beta&t=urAq_YPzN2sUi9PSI9uWuqNIVUg2RpwgokHs7Y9bEdM"
            alt="Pet Care"
            style={styles.registerImage}
          />
        </div>
        <div style={styles.registerWrapper}>
          <h4 style={styles.registerHeader}>Sign Up</h4>
          <form style={styles.registerContainer} onSubmit={handleSubmit}>
            <div style={styles.nameFields}>
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                color="secondary"
                style={styles.nameInput}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                color="secondary"
                style={styles.nameInput}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </div>
            <Input
              type="email"
              placeholder="Email id"
              name="email"
              value={formData.email}
              onChange={handleChange}
              color="secondary"
              style={styles.fullWidthInput}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="8"
              required
              color="secondary"
              style={styles.fullWidthInput}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              color="secondary"
              type="submit"
              style={styles.submitButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </form>
          <div style={styles.loginLink}>
            <p>Already have an account? <Link to="/login" style={styles.link} onMouseOver={(e) => e.currentTarget.style.textDecoration = styles.linkHover.textDecoration} onMouseOut={(e) => e.currentTarget.style.textDecoration = styles.link.textDecoration}>Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
