import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaEdit, FaCheck, FaTimes, FaCamera } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const ProfilePage = () => {
  const { user, loading, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    middleName: '',
    familyName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    qualification: '',
    occupation: '',
    designation: '',
    interests: '',
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });
  const [formError, setFormError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photoError, setPhotoError] = useState('');

  // Redirect if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    
    // Initialize form data with user data when available
    if (user) {
      setFormData({
        name: user.name || '',
        middleName: user.middleName || '',
        familyName: user.familyName || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        qualification: user.qualification || '',
        occupation: user.occupation || '',
        designation: user.designation || '',
        interests: user.interests || '',
        socialMediaLinks: {
          facebook: user.socialMediaLinks?.facebook || '',
          twitter: user.socialMediaLinks?.twitter || '',
          linkedin: user.socialMediaLinks?.linkedin || '',
          instagram: user.socialMediaLinks?.instagram || ''
        }
      });
      setPreviewUrl(user.profilePhoto || null);
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('socialMediaLinks.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMediaLinks: {
          ...prev.socialMediaLinks,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('File size should be less than 5MB');
        return;
      }
      if (!file.type.match(/image\/(jpeg|png|gif)/)) {
        setPhotoError('Only JPG, PNG, and GIF files are allowed');
        return;
      }
      setPhotoError('');
      setPhotoFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) {
      setPhotoError('Please select a photo to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('photo', photoFile);

      const response = await api.post('/api/users/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (response.data.photoUrl) {
        // Update the user state with the new photo URL
        updateProfile({ profilePhoto: response.data.photoUrl });
        setPhotoFile(null);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      setPhotoError('Failed to upload photo. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setUpdateSuccess(false);

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setUpdateSuccess(true);
        setIsEditing(false);
        // Reset success message after 3 seconds
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      } else {
        setFormError(result.message || 'Failed to update profile');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
      console.error('Profile update error:', err);
    }
  };

  if (loading) {
    return (
      <ProfileContainer>
        <div className="container">
          <LoadingMessage>Loading profile...</LoadingMessage>
        </div>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <div className="container">
        <ProfileCard>
          <ProfileHeader>
            <ProfileTitle>My Profile</ProfileTitle>
            {!isEditing && (
              <EditButton onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Profile
              </EditButton>
            )}
          </ProfileHeader>

          {updateSuccess && (
            <SuccessMessage>
              <FaCheck /> Profile updated successfully!
            </SuccessMessage>
          )}

          {formError && (
            <ErrorMessage>
              <FaTimes /> {formError}
            </ErrorMessage>
          )}

          {isEditing ? (
            <ProfileForm onSubmit={handleSubmit}>
              <FormSectionTitle>Personal Information</FormSectionTitle>
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="name">Full Name*</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email*</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                  <FormInput
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="familyName">Family Name</FormLabel>
                  <FormInput
                    type="text"
                    id="familyName"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="phone">Phone Number*</FormLabel>
                  <FormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="gender">Gender*</FormLabel>
                  <FormSelect
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </FormSelect>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="dateOfBirth">Date of Birth*</FormLabel>
                  <FormInput
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormSectionTitle>Address Information</FormSectionTitle>
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="address">Address*</FormLabel>
                  <FormInput
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="city">City*</FormLabel>
                  <FormInput
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="state">State*</FormLabel>
                  <FormInput
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormSectionTitle>Professional Information</FormSectionTitle>
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="qualification">Qualification*</FormLabel>
                  <FormInput
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="occupation">Occupation*</FormLabel>
                  <FormInput
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="designation">Designation</FormLabel>
                  <FormInput
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="interests">Interests</FormLabel>
                  <FormInput
                    type="text"
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                  />
                </FormGroup>
              </FormRow>

              <FormSectionTitle>Social Media Links</FormSectionTitle>
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="facebook">Facebook</FormLabel>
                  <FormInput
                    type="url"
                    id="facebook"
                    name="socialMediaLinks.facebook"
                    value={formData.socialMediaLinks.facebook}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="twitter">Twitter</FormLabel>
                  <FormInput
                    type="url"
                    id="twitter"
                    name="socialMediaLinks.twitter"
                    value={formData.socialMediaLinks.twitter}
                    onChange={handleChange}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
                  <FormInput
                    type="url"
                    id="linkedin"
                    name="socialMediaLinks.linkedin"
                    value={formData.socialMediaLinks.linkedin}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="instagram">Instagram</FormLabel>
                  <FormInput
                    type="url"
                    id="instagram"
                    name="socialMediaLinks.instagram"
                    value={formData.socialMediaLinks.instagram}
                    onChange={handleChange}
                  />
                </FormGroup>
              </FormRow>

              <FormSectionTitle>Profile Photo</FormSectionTitle>
              <PhotoUploadContainer>
                <ProfileAvatar>
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile preview" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '15px'
                      }} 
                    />
                  ) : (
                    <FaUser style={{ fontSize: '4rem', color: '#666' }} />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: '#cd232e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                  >
                    <FaCamera />
                  </button>
                </ProfileAvatar>
                {photoError && <ErrorMessage>{photoError}</ErrorMessage>}
                {photoFile && (
                  <UploadButton onClick={handlePhotoUpload}>
                    Upload Photo
                  </UploadButton>
                )}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <ProgressBar>
                    <ProgressFill style={{ width: `${uploadProgress}%` }} />
                  </ProgressBar>
                )}
              </PhotoUploadContainer>

              <FormActions>
                <CancelButton type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit">Save Changes</SaveButton>
              </FormActions>
            </ProfileForm>
          ) : (
            <ProfileDetails>
              <ProfileAvatar>
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '15px'
                    }} 
                  />
                ) : (
                  <FaUser style={{ fontSize: '4rem', color: '#666' }} />
                )}
              </ProfileAvatar>
              
              <ProfileInfo>
                <ProfileName>{user?.name}</ProfileName>
                <ProfileEmail>{user?.email}</ProfileEmail>
                
                <ProfileDetailsSection>
                  <ProfileDetailTitle>Personal Information</ProfileDetailTitle>
                  <ProfileDetailItem>
                    <DetailLabel>Middle Name:</DetailLabel>
                    <DetailValue>{user?.middleName || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Family Name:</DetailLabel>
                    <DetailValue>{user?.familyName || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>{user?.phone || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Gender:</DetailLabel>
                    <DetailValue>{user?.gender || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Date of Birth:</DetailLabel>
                    <DetailValue>
                      {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not specified'}
                    </DetailValue>
                  </ProfileDetailItem>
                </ProfileDetailsSection>

                <ProfileDetailsSection>
                  <ProfileDetailTitle>Address Information</ProfileDetailTitle>
                  <ProfileDetailItem>
                    <DetailLabel>Address:</DetailLabel>
                    <DetailValue>{user?.address || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>City:</DetailLabel>
                    <DetailValue>{user?.city || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>State:</DetailLabel>
                    <DetailValue>{user?.state || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                </ProfileDetailsSection>

                <ProfileDetailsSection>
                  <ProfileDetailTitle>Professional Information</ProfileDetailTitle>
                  <ProfileDetailItem>
                    <DetailLabel>Qualification:</DetailLabel>
                    <DetailValue>{user?.qualification || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Occupation:</DetailLabel>
                    <DetailValue>{user?.occupation || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Designation:</DetailLabel>
                    <DetailValue>{user?.designation || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Interests:</DetailLabel>
                    <DetailValue>{user?.interests || 'Not specified'}</DetailValue>
                  </ProfileDetailItem>
                </ProfileDetailsSection>

                <ProfileDetailsSection>
                  <ProfileDetailTitle>Social Media Links</ProfileDetailTitle>
                  <ProfileDetailItem>
                    <DetailLabel>Facebook:</DetailLabel>
                    <DetailValue>
                      {user?.socialMediaLinks?.facebook ? (
                        <a href={user.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                          {user.socialMediaLinks.facebook}
                        </a>
                      ) : 'Not specified'}
                    </DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Twitter:</DetailLabel>
                    <DetailValue>
                      {user?.socialMediaLinks?.twitter ? (
                        <a href={user.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                          {user.socialMediaLinks.twitter}
                        </a>
                      ) : 'Not specified'}
                    </DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>LinkedIn:</DetailLabel>
                    <DetailValue>
                      {user?.socialMediaLinks?.linkedin ? (
                        <a href={user.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          {user.socialMediaLinks.linkedin}
                        </a>
                      ) : 'Not specified'}
                    </DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Instagram:</DetailLabel>
                    <DetailValue>
                      {user?.socialMediaLinks?.instagram ? (
                        <a href={user.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                          {user.socialMediaLinks.instagram}
                        </a>
                      ) : 'Not specified'}
                    </DetailValue>
                  </ProfileDetailItem>
                </ProfileDetailsSection>

                <MembershipSection>
                  <SectionTitle>Membership Status</SectionTitle>
                  
                  {user?.membershipStatus === 'active' ? (
                    <>
                      <StatusBadge active>Active</StatusBadge>
                      <MembershipDetails>
                        <DetailRow>
                          <DetailLabel>Type:</DetailLabel>
                          <DetailValue>{user?.membershipType || 'Standard'}</DetailValue>
                        </DetailRow>
                        {user?.membershipStartDate && (
                          <DetailRow>
                            <DetailLabel>Since:</DetailLabel>
                            <DetailValue>
                              {new Date(user.membershipStartDate).toLocaleDateString()}
                            </DetailValue>
                          </DetailRow>
                        )}
                        {user?.membershipEndDate && (
                          <DetailRow>
                            <DetailLabel>Valid until:</DetailLabel>
                            <DetailValue>
                              {new Date(user.membershipEndDate).toLocaleDateString()}
                            </DetailValue>
                          </DetailRow>
                        )}
                      </MembershipDetails>
                    </>
                  ) : (
                    <>
                      <StatusRow>
                        <StatusBadge>Pending</StatusBadge>
                        <MembershipMessage>
                          Complete your membership to access all features
                        </MembershipMessage>
                      </StatusRow>
                      <MembershipButton onClick={() => navigate('/membership')}>
                        Become a Member
                      </MembershipButton>
                    </>
                  )}
                  <RedirectButton onClick={() => navigate('/membership-details')}>
                    View Membership Details
                  </RedirectButton>
                </MembershipSection>
              </ProfileInfo>
            </ProfileDetails>
          )}
        </ProfileCard>
      </div>
    </ProfileContainer>
  );
};

export default ProfilePage;

const ProfileContainer = styled.div`
  padding: 2rem 0;
  background-color: #f8f9fa;
  min-height: calc(100vh - 60px);
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  margin: 0 auto;
  max-width: 1200px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ProfileTitle = styled.h1`
  color: #2b2928;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.5px;
`;

const EditButton = styled.button`
  background-color: #cd232e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: #b01c26;
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  border-left: 4px solid #28a745;
  
  svg {
    color: #28a745;
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  border-left: 4px solid #dc3545;
  
  svg {
    color: #dc3545;
    font-size: 1.2rem;
  }
`;

const ProfileForm = styled.form`
  margin-top: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 500;
  color: #2b2928;
  font-size: 0.95rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  
  &:focus {
    border-color: #cd232e;
    outline: none;
    box-shadow: 0 0 0 3px rgba(205, 35, 46, 0.1);
    background-color: white;
  }
  
  &:read-only {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
`;

const CancelButton = styled.button`
  background-color: #f1f1f1;
  color: #2b2928;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const SaveButton = styled.button`
  background-color: #cd232e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: #b01c26;
    transform: translateY(-2px);
  }
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProfileAvatar = styled.div`
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #666;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileName = styled.h2`
  font-size: 1.8rem;
  color: #2b2928;
  margin: 0;
  font-weight: 600;
`;

const ProfileEmail = styled.p`
  color: #666;
  margin: 0;
  font-size: 1.1rem;
`;

const ProfileDetailsSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ProfileDetailTitle = styled.h3`
  font-size: 1.2rem;
  color: #2b2928;
  margin: 0 0 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #f0f0f0;
  font-weight: 600;
`;

const ProfileDetailItem = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #666;
  font-size: 0.95rem;
`;

const DetailValue = styled.span`
  color: #2b2928;
  font-size: 0.95rem;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
  background-color: #f8f9fa;
  
  &:focus {
    border-color: var(--primary-color, #cd232e);
    outline: none;
    box-shadow: 0 0 0 3px rgba(205, 35, 46, 0.1);
    background-color: white;
  }
`;

const PhotoUploadContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
`;

const MembershipSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  color: #2b2928;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props => props.active ? '#d4edda' : '#fff3cd'};
  color: ${props => props.active ? '#155724' : '#856404'};
  margin-bottom: 1rem;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const MembershipMessage = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.95rem;
`;

const MembershipDetails = styled.div`
  margin-top: 1rem;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
  margin-bottom: 0.8rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RedirectButton = styled.button`
  background-color: #cd232e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  flex: 1;
  
  &:hover {
    background-color: #b01c26;
    transform: translateY(-2px);
  }
`;

const MembershipButton = styled.button`
  background-color: #cd232e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  flex: 1;
  
  &:hover {
    background-color: #b01c26;
    transform: translateY(-2px);
  }
`;

const FormSectionTitle = styled.h3`
  color: #2b2928;
  margin: 2rem 0 1.2rem;
  font-size: 1.2rem;
  font-weight: 600;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #f0f0f0;
`;

const Required = styled.span`
  color: #cd232e;
  margin-left: 4px;
`;
