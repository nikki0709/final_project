import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

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

function Header({ onAboutClick }) {
  return (
    <HeaderContainer>
      <Nav>
        <Title>House-Tree-Person Test</Title>
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