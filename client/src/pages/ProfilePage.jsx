import { useState } from 'react';
import styled from 'styled-components';

const ProfilePage = () => {
  // This would normally come from your backend or auth context
  const [userData, setUserData] = useState({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    company: 'Smith Designs',
    profession: 'Graphic Designer',
    location: 'New York, USA',
    phone: '(555) 123-4567',
    profileImage: 'https://web-assets.same.dev/1698794521/1895046616.png',
    joinDate: 'January 15, 2023',
    membershipType: 'Premium'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to your API
    setUserData({...formData});
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <div className="container">
        <PageTitle>My Profile</PageTitle>

        <ProfileWrapper>
          <ProfileSidebar>
            <ProfileImageContainer>
              <ProfileImage src={userData.profileImage} alt={userData.name} />
              {isEditing && (
                <ChangeImageButton>Change Photo</ChangeImageButton>
              )}
            </ProfileImageContainer>

            <MemberInfoContainer>
              <MemberInfoTitle>Membership Info</MemberInfoTitle>
              <MemberInfoItem>
                <Label>Member Since:</Label>
                <Value>{userData.joinDate}</Value>
              </MemberInfoItem>
              <MemberInfoItem>
                <Label>Membership Type:</Label>
                <Value>{userData.membershipType}</Value>
              </MemberInfoItem>
              <MemberInfoItem>
                <Label>Status:</Label>
                <StatusBadge>Active</StatusBadge>
              </MemberInfoItem>
            </MemberInfoContainer>
          </ProfileSidebar>

          <ProfileContent>
            {!isEditing ? (
              <ProfileInfo>
                <ProfileHeader>
                  <ProfileName>{userData.name}</ProfileName>
                  <ProfileRole>{userData.profession}</ProfileRole>
                  <EditButton onClick={() => setIsEditing(true)}>Edit Profile</EditButton>
                </ProfileHeader>

                <ProfileDetailsSection>
                  <ProfileDetailTitle>Personal Information</ProfileDetailTitle>
                  <ProfileDetailItem>
                    <DetailLabel>Email:</DetailLabel>
                    <DetailValue>{userData.email}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>{userData.phone}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Location:</DetailLabel>
                    <DetailValue>{userData.location}</DetailValue>
                  </ProfileDetailItem>
                </ProfileDetailsSection>

                <ProfileDetailsSection>
                  <ProfileDetailTitle>Business Information</ProfileDetailTitle>
                  <ProfileDetailItem>
                    <DetailLabel>Company:</DetailLabel>
                    <DetailValue>{userData.company}</DetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <DetailLabel>Profession:</DetailLabel>
                    <DetailValue>{userData.profession}</DetailValue>
                  </ProfileDetailItem>
                </ProfileDetailsSection>
              </ProfileInfo>
            ) : (
              <ProfileForm onSubmit={handleSubmit}>
                <ProfileHeader>
                  <h2>Edit Profile</h2>
                  <div>
                    <CancelButton type="button" onClick={() => setIsEditing(false)}>Cancel</CancelButton>
                    <SaveButton type="submit">Save Changes</SaveButton>
                  </div>
                </ProfileHeader>

                <FormSection>
                  <SectionTitle>Personal Information</SectionTitle>
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="name">Full Name</FormLabel>
                      <FormInput
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormInput
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <FormInput
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="location">Location</FormLabel>
                      <FormInput
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </FormRow>
                </FormSection>

                <FormSection>
                  <SectionTitle>Business Information</SectionTitle>
                  <FormRow>
                    <FormGroup>
                      <FormLabel htmlFor="company">Company</FormLabel>
                      <FormInput
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="profession">Profession</FormLabel>
                      <FormInput
                        type="text"
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </FormRow>
                </FormSection>
              </ProfileForm>
            )}
          </ProfileContent>
        </ProfileWrapper>
      </div>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  padding: 60px 0;
  background-color: #f8f8f8;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ProfileSidebar = styled.div`
  width: 250px;

  @media (max-width: 992px) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    margin-bottom: 0;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ChangeImageButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const MemberInfoContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 992px) {
    flex: 1;
    min-width: 250px;
  }
`;

const MemberInfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const MemberInfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 500;
  color: #666;
`;

const Value = styled.span`
  font-weight: 600;
`;

const StatusBadge = styled.span`
  background-color: #d4edda;
  color: #155724;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProfileContent = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const ProfileInfo = styled.div``;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ProfileName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 5px;
`;

const ProfileRole = styled.div`
  font-size: 1.1rem;
  color: #666;
`;

const EditButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b01c26;
  }
`;

const ProfileDetailsSection = styled.div`
  margin-bottom: 30px;
`;

const ProfileDetailTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const ProfileDetailItem = styled.div`
  margin-bottom: 15px;
  display: flex;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const DetailLabel = styled.div`
  font-weight: 600;
  width: 100px;

  @media (max-width: 576px) {
    width: auto;
    margin-bottom: 5px;
  }
`;

const DetailValue = styled.div`
  flex: 1;
`;

const ProfileForm = styled.form``;

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormGroup = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SaveButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b01c26;
  }
`;

const CancelButton = styled.button`
  background-color: #f1f1f1;
  color: #333;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export default ProfilePage;
