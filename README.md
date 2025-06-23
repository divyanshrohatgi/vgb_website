
A modern, responsive website for my client VGB foundation

## 🌟 Features

- **User Authentication**
  - Secure login and registration system
  - Email verification
  - Password reset functionality
  - Profile management

- **Membership System**
  - Multiple membership tiers (Basic, Silver, Gold)
  - Digital membership cards
  - Membership upgrade options
  - Exclusive member benefits

- **Donation System**
  - Secure payment integration with Razorpay
  - Multiple donation options
  - Recurring donation support
  - Automated donation receipts

- **Event Management**
  - Interactive event calendar
  - Event registration
  - Event details and updates
  - PDF downloads for event information

- **Community Features**
  - Discussion forums
  - Chapter information
  - Volunteer opportunities
  - Community engagement tools

- **Content Management**
  - About Us sections
  - Initiative pages (Gau, Ganga, Gayatri, Gita, Guru)
  - Team information
  - News and updates

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router for navigation
- Styled Components for styling
- React Icons for icons
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Nodemailer for email services
- Razorpay for payments

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vgb_website.git
cd vgb_website
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:
```bash
# Create .env file in server directory
cp .env.example .env

# Create .env file in client directory
cd ../client
cp .env.example .env
```

4. Start the development servers:
```bash
# Start server
cd server
npm run dev

# Start client
cd ../client
npm run dev
```

## 🔧 Configuration

### Server Configuration
- Set up MongoDB connection string
- Configure email service credentials
- Set up Razorpay API keys
- Configure JWT secret

### Client Configuration
- Set API endpoint URLs
- Configure environment variables
- Set up payment gateway keys

## 📱 Pages

- Home
- About
  - Vision & Mission
  - Sankalp
  - Boards & Departments
  - Event Calendar
  - Who's Who
- Experience
- Community
- Donate
- Contact
- Team
- Membership
- Login/Register
- Profile

## 🎨 Design System

- **Colors**
  - Primary: #cd232e (VGB Red)
  - Secondary: #2b2928 (Dark Gray)
  - Accent: #D4AF37 (Gold)
  - Background: #f8f9fa

- **Typography**
  - Headings: Montserrat
  - Body: Open Sans
  - Special: Playfair Display

## 🔒 Security Features

- JWT-based authentication
- Password encryption
- Email verification
- Secure payment processing
- Input validation
- XSS protection
- CSRF protection

## 📧 Email Templates

- Welcome emails
- Verification emails
- Password reset emails
- Donation receipts
- Membership confirmations
- Event registrations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All contributors and supporters
- The Vishwa Guru Bharat team
- Open source community

## 📞 Support

For support, email info@vishwagurubharat.org or visit our website at https://vishwagurubharat.org 
