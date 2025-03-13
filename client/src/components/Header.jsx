import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo>
            <Link to="/">
              <img 
                src="https://web-assets.same.dev/4078305203/3980109376.png" 
                alt="BNI Logo" 
              />
            </Link>
          </Logo>

          <NavMenu className={isOpen ? 'active' : ''}>
            <NavItem>
              <Link to="/experience" onClick={() => setIsOpen(false)}>BNI Experience</Link>
            </NavItem>
            <NavItem>
              <Link to="/community" onClick={() => setIsOpen(false)}>Community</Link>
            </NavItem>
            <NavItem className="dropdown">
              <span>About</span>
              <DropdownContent>
                <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
                <Link to="/leadership" onClick={() => setIsOpen(false)}>Leadership</Link>
                <Link to="/founders" onClick={() => setIsOpen(false)}>Our Founders</Link>
              </DropdownContent>
            </NavItem>
            <NavItem>
              <Link to="/donate" onClick={() => setIsOpen(false)}>Donate</Link>
            </NavItem>
            {user && (
              <NavItem className="mobile-only">
                <Link to="/profile" onClick={() => setIsOpen(false)}>My Profile</Link>
              </NavItem>
            )}
            {user && (
              <NavItem className="mobile-only">
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </NavItem>
            )}
            <MobileClose onClick={toggleMenu}>
              <FaTimes />
            </MobileClose>
          </NavMenu>

          <HeaderRight>
            {user ? (
              <UserMenu>
                <UserButton to="/profile">
                  <FaUser />
                  <span>My Profile</span>
                </UserButton>
                <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
              </UserMenu>
            ) : (
              <AuthButtons>
                <LoginButton to="/login">Sign In</LoginButton>
                <RegisterButton to="/register">Join Now</RegisterButton>
              </AuthButtons>
            )}
            <MobileToggle onClick={toggleMenu}>
              <FaBars />
            </MobileToggle>
          </HeaderRight>
        </HeaderContent>
      </div>
      
      {user && user.membershipStatus === 'pending' && (
        <MembershipAlert>
          <div className="container">
            Complete your membership to access all BNI benefits. 
            <MembershipAlertLink to="/profile">Go to your profile</MembershipAlertLink>
          </div>
        </MembershipAlert>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 15px 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  img {
    height: 40px;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 400px;
    height: 100vh;
    background-color: #fff;
    flex-direction: column;
    padding: 80px 30px;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 1000;
    
    &.active {
      right: 0;
    }

    .mobile-only {
      display: block;
    }
  }

  .mobile-only {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0 15px;
  position: relative;
  
  a, span {
    color: var(--secondary-color);
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s;
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  &.dropdown {
    &:hover {
      > div {
        display: block;
      }
    }
  }
  
  @media (max-width: 992px) {
    margin: 15px 0;
    font-size: 18px;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 1;
  border-radius: 5px;
  
  a {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    
    &:hover {
      background-color: #f6f6f6;
    }
  }
  
  @media (max-width: 992px) {
    position: static;
    box-shadow: none;
    padding: 10px 0 10px 20px;
    
    a {
      padding: 8px 0;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled(Link)`
  color: var(--secondary-color);
  font-weight: 600;
  padding: 8px 15px;
  margin-right: 10px;
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-color);
    background-color: #f9f9f9;
  }
`;

const RegisterButton = styled(Link)`
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 600;
  transition: background-color 0.3s;
  text-decoration: none;
  
  &:hover {
    background-color: #b01c26;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserButton = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--secondary-color);
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    color: var(--primary-color);
    background-color: #f9f9f9;
  }
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  color: var(--secondary-color);
  font-weight: 500;
  cursor: pointer;
  padding: 8px 15px;
  font-size: 1rem;
  transition: color 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--secondary-color);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  text-align: left;
  transition: color 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--secondary-color);
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const MobileClose = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--secondary-color);
  position: absolute;
  top: 20px;
  right: 20px;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const MembershipAlert = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 8px 0;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const MembershipAlertLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 600;
  margin-left: 10px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default Header;