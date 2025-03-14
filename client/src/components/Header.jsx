// client/src/components/Header.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUser, FaHandHoldingHeart, FaTree, FaBookReader, FaOm} from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      <TopHeader>
        <div className="container">
          <TopHeaderContent>
            <SocialIcons>
              <SocialIcon href="#"><i className="fab fa-facebook-f"></i></SocialIcon>
              <SocialIcon href="#"><i className="fab fa-twitter"></i></SocialIcon>
              <SocialIcon href="#"><i className="fab fa-instagram"></i></SocialIcon>
              <SocialIcon href="#"><i className="fab fa-youtube"></i></SocialIcon>
            </SocialIcons>
            <ContactInfo>
              <ContactItem><i className="fas fa-phone"></i> +91-9103544414</ContactItem>
              <ContactItem><i className="fas fa-envelope"></i> info@vishwagurubharat.org</ContactItem>
            </ContactInfo>
          </TopHeaderContent>
        </div>
      </TopHeader>
      
      <MainHeader>
        <div className="container">
          <HeaderContent>
            <Logo>
              <Link to="/">
                <img 
                  src="https://web-assets.same.dev/335287695/52350043.png" 
                  alt="Vishwa Guru Bharat Logo" 
                />
              </Link>
            </Logo>

            <NavMenu className={isOpen ? 'active' : ''}>
              <NavItem>
                <Link to="/experience" onClick={() => setIsOpen(false)}>
                  <NavIcon><FaOm /></NavIcon>
                  VGB Experience
                </Link>
              </NavItem>
              <NavItem
                className="dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
              <span>
                <NavIcon><FaHandHoldingHeart /></NavIcon>
                Initiatives
              </span>
              {dropdownOpen && (
                <DropdownContent>
                  <DropdownItem to="/gau" onClick={() => setDropdownOpen(false)}>Gau Seva</DropdownItem>
                  <DropdownItem to="/ganga" onClick={() => setDropdownOpen(false)}>Ganga Conservation</DropdownItem>
                  <DropdownItem to="/gayatri" onClick={() => setDropdownOpen(false)}>Gayatri Awareness</DropdownItem>
                  <DropdownItem to="/gita" onClick={() => setDropdownOpen(false)}>Gita Teachings</DropdownItem>
                  <DropdownItem to="/guru" onClick={() => setDropdownOpen(false)}>Guru Initiatives</DropdownItem>
                </DropdownContent>
              )}
            </NavItem>
              <NavItem>
                <Link to="/community" onClick={() => setIsOpen(false)}>
                  <NavIcon><FaTree /></NavIcon>
                  Community
                </Link>
                </NavItem>
                <NavItem>
                <Link to="/about" onClick={() => setIsOpen(false)}>
                  <NavIcon><FaBookReader /></NavIcon>
                  About
                </Link>
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
      </MainHeader>
      
      {user && user.membershipStatus === 'pending' && (
        <MembershipAlert>
          <div className="container">
            Complete your membership to access all features. 
            <MembershipAlertLink to="/profile">Go to your profile</MembershipAlertLink>
          </div>
        </MembershipAlert>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TopHeader = styled.div`
  background-color: #cd232e;
  padding: 8px 0;
  color: white;
`;

const TopHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 16px;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
    text-align: center;
  }
`;

const ContactItem = styled.div`
  font-size: 14px;
  
  i {
    margin-right: 5px;
  }
`;

const MainHeader = styled.div`
  background-color: #fff;
  padding: 15px 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  img {
    height: 70px; /* Larger logo */
    
    @media (max-width: 768px) {
      height: 50px;
    }
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

const NavIcon = styled.span`
  display: inline-block;
  margin-right: 8px;
  font-size: 20px; /* Larger icon */
  color: #cd232e;
  vertical-align: middle;
`;

const NavItem = styled.li`
  margin: 0 15px;
  position: relative;
  
  a, span {
    color: #2b2928;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s;
    text-decoration: none;
    display: flex;
    align-items: center;
    
    &:hover {
      color: #cd232e;
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
  color: #2b2928;
  font-weight: 600;
  padding: 10px 18px;
  margin-right: 10px;
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
  
  &:hover {
    color: #cd232e;
    background-color: #f9f9f9;
  }
`;

const RegisterButton = styled(Link)`
  background-color: #cd232e;
  color: #fff;
  border-radius: 4px;
  padding: 12px 22px;
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
  color: #2b2928;
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
  
  svg {
    margin-right: 8px;
    font-size: 20px;
  }
  
  &:hover {
    color: #cd232e;
    background-color: #f9f9f9;
  }
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  color: #2b2928;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 15px;
  font-size: 1rem;
  transition: color 0.3s;
  
  &:hover {
    color: #cd232e;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #2b2928;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  text-align: left;
  transition: color 0.3s;
  
  &:hover {
    color: #cd232e;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 28px; /* Larger icon */
  color: #2b2928;
  cursor: pointer;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const MobileClose = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 28px; /* Larger icon */
  color: #2b2928;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const MembershipAlert = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 10px 0;
  text-align: center;
  font-size: 0.9rem;
`;

const MembershipAlertLink = styled(Link)`
  color: #cd232e;
  font-weight: 600;
  margin-left: 10px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;


const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #f6f6f6;
  }
`;


export default Header;