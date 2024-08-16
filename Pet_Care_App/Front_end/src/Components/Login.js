import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Import the AuthContext
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
    order: 1,
  },
  loginImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  loginWrapper: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loginHeader: {
    textAlign: 'center',
    color: 'purple',
    marginBottom: '20px',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
  googleButton: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    marginTop: '10px',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: '5px',
  },
  link: {
    color: 'purple',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

const Login = () => {
  const { login } = useContext(AuthContext); // Use the AuthContext
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
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
    if (!formData.emailId || !/\S+@\S+\.\S+/.test(formData.emailId)) newErrors.emailId = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post('http://localhost:8082/api/login-user', formData);
        const user = response.data;
        login(user); // Pass user details to login function
        navigate('/');
        setLoginError('');
      } catch (error) {
        if (error.response && error.response.data) {
          setLoginError(error.response.data.message);
        } else {
          setLoginError('Login failed. Please check your email and password.');
        }
      }
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img
            src="https://www.nyvetclinic.com/wp-content/uploads/2018/08/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%AA%D8%AC%D9%85%D9%8A%D9%84-%D9%88%D8%B1%D8%B9%D8%A7%D9%8A%D8%A9-%D8%A7%D9%84%D8%AD%D9%8A%D9%88%D8%A7%D9%86-%D8%A7%D9%84%D8%A3%D9%84%D9%8A%D9%81.jpg"
            alt="Pet Care"
            style={styles.loginImage}
          />
        </div>
        <div style={styles.loginWrapper}>
          <h4 style={styles.loginHeader}>Sign In</h4>
          <form style={styles.loginContainer} onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email id"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              color="secondary"
              style={styles.fullWidthInput}
              error={!!errors.emailId}
              helperText={errors.emailId}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
            >
              Sign in
            </Button>
          </form>
          {loginError && <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>}
          <div className="forgot-password">
            <p><Link to="/forgot-password" style={styles.link}>Forgot your password?</Link></p>
          </div>
          <div style={styles.registerLink}>
            <p>Don't have an account? <Link to="/Register" style={styles.link} onMouseOver={(e) => e.currentTarget.style.textDecoration = styles.linkHover.textDecoration} onMouseOut={(e) => e.currentTarget.style.textDecoration = styles.link.textDecoration}>Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
