import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <Link to="/experience">The BNI Experience</Link>
            </NavItem>
            <NavItem>
              <Link to="/community">Our Global Community</Link>
            </NavItem>
            <NavItem>
              <Link to="/stories">My BNI Story</Link>
            </NavItem>
            <NavItem>
              <Link to="/franchising">BNI Franchising</Link>
            </NavItem>
            <NavItem className="dropdown">
              <span>About BNI</span>
              <DropdownContent>
                <Link to="/about">About Us</Link>
                <Link to="/leadership">Leadership</Link>
                <Link to="/directors">National Directors</Link>
                <Link to="/founder">Our Founder</Link>
                <Link to="/careers">Careers</Link>
              </DropdownContent>
            </NavItem>
            <MobileClose onClick={toggleMenu}>
              <FaTimes />
            </MobileClose>
          </NavMenu>

          <HeaderRight>
            <PhoneNumber href="tel:8008258286">
              <FaPhone /> 1-800-825-8286
            </PhoneNumber>
            <GetInvitedButton to="/find-a-chapter">GET INVITED</GetInvitedButton>
            <MobileToggle onClick={toggleMenu}>
              <FaBars />
            </MobileToggle>
          </HeaderRight>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

const PhoneNumber = styled.a`
  display: flex;
  align-items: center;
  color: var(--secondary-color);
  font-weight: 500;
  margin-right: 20px;

  svg {
    margin-right: 5px;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const GetInvitedButton = styled(Link)`
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 30px;
  padding: 10px 20px;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b01c26;
  }

  @media (max-width: 768px) {
    display: none;
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

export default Header;
