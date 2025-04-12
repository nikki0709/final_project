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

const NavLink = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${props => props.active ? '#007bff' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    color: #007bff;
  }
`;

function Header({ currentPage, onPageChange }) {
  return (
    <HeaderContainer>
      <Nav>
        <Title>House-Tree-Person Test</Title>
        <NavLinks>
          <NavLink 
            active={currentPage === 'test'}
            onClick={() => onPageChange('test')}
          >
            Take Test
          </NavLink>
          <NavLink 
            active={currentPage === 'about'}
            onClick={() => onPageChange('about')}
          >
            About
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 