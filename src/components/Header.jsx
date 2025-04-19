import React from 'react';
import styled from '@emotion/styled';

// Styled component for the header container
// Provides a fixed position at the top of the page with a white background and subtle shadow
const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

// Styled component for the navigation wrapper
// Centers the content and sets maximum width for larger screens
// Ensures alignment with main content below
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1160px; /* Matches the effective width of MainContent + padding */
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box; /* Include padding in width calculation */
`;

// Styled component for the application title
// Applies consistent text styling
const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`;

// Styled component for the navigation links container
// Arranges buttons in a row with consistent spacing
const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

// Styled component for navigation buttons
// Provides consistent button styling with hover effects
const Button = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

// Header component that displays the application title and navigation buttons
// Props:
// - onAboutClick: Function to handle About button click
function Header({ onAboutClick }) {
  return (
    <HeaderContainer>
      <Nav>
        <Title>House🏡-Tree🌳-Person🚶 Test</Title>
        <NavLinks>
          <Button onClick={onAboutClick}>
            About
          </Button>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 