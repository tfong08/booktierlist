import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vh;
  background-color: #f0f0f0;
`;

const LoginButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  background-color: #9d7ee3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: background-color .1s ease;

  &:hover {
    background-color: #baa7e7;
  }
`;

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google'; // Replace with your backend URL
  };

  return (
    <Container>
      <LoginButton onClick={handleLogin}>Login with Google</LoginButton>
    </Container>
  );
};

export default Login;
