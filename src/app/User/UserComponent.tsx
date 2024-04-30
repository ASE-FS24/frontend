import {User} from "./UserType";
import styled from "styled-components";
import {ReactComponent as ProfileSVG} from "../../static/images/profile.svg";
import {ReactComponent as EditIcon} from "../../static/images/edit_pen.svg";
import React, {useState, useRef, useEffect} from 'react';
import {updateUser, updateProfilePic, getProfilePic} from "./UserService";

const ProfilePicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`;

const UploadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
`;

const UploadText = styled.p`
  color: #fff;
  font-size: 14px;
`;

const ProfileIconContainer = styled.div`
  width: 130px;
  height: 100px;
  margin-right: 20px;
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  background-color: #ffffff20;

  &:hover > ${ProfilePicImage} {
    opacity: 0.8;
  }

  &:hover > ${UploadOverlay} {
    opacity: 1;
  }
`;

const InputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: flex-start; /* Align items at the start of the cross axis */
  background-color: #2d2d2d;
  color: #fff;
  padding: 40px; /* Adjust padding */
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const ProfileIcon = styled.label`
  width: 100px;
  height: 100px;
  margin-right: 40px; /* Add margin for spacing */
  // display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-size: cover;
  background-position: center;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FieldBox = styled.div`
  background-color: #444;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
  min-width: 100px; /* Adjust the minimum width as needed */
`;


const Separator = styled.div`
  width: 1px;
  height: 100%;
  background-color: #888;
  margin-right: 10px;
`;

const UserInfoText = styled.span`
  white-space: nowrap; /* Prevent line break */
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EditButton = styled(EditIcon)`
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
  opacity: 0.5; /* Default opacity */
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const SaveButton = styled.button`
  background-color: #007bff; /* Button background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Cursor style */
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }

  &:focus {
    outline: none; /* Remove focus outline */
  }
`;


export function UserComponent({user}: { user: User }) {

    const [editableField, setEditableField] = useState<string | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [editedUser, setEditedUser] = useState<User>({...user});
    const [profilePic, setProfilePic] = useState<string | null>(null);


    const handleEdit = (fieldName: string) => {
        setEditableField(fieldName);
    };

    // Ref for file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Define handlePhotoUpload function to handle file uploads
    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const result = await updateProfilePic(user.id, file);
            if (result) {
                console.log("Profile picture uploaded successfully:", result);
                // Update UI accordingly if needed
            } else {
                console.log("Failed to upload profile picture");
                // Handle error if needed
            }
        }
    };

    // Function to handle profile picture upload
    const handleProfilePicUpload = () => {
        fileInputRef.current?.click(); // Trigger file input
    };

    // Function to handle changes in input fields
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Function to handle save
    const handleSave = async () => {
        try {
            // Call updateUser function to update user data
            const updatedUser = await updateUser(editedUser);
            if (updatedUser) {
                console.log("User updated successfully:", updatedUser);
                setEditableField(null); // Reset editableField state
            } else {
                console.log("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const picUrl = await getProfilePic(user.id); // Assuming user.id is the user's ID
                setProfilePic(picUrl);
            } catch (error) {
                console.error('Error fetching profile picture:', error);
                // Handle error if necessary
            }
        };
        fetchProfilePic();
    }, [user.id]); // Run effect when user.id changes

    return (
        <StyledUserContainer>
            <ProfileIconContainer>
                {profilePic ? (
                    <ProfilePicImage src={profilePic} alt="Profile"/>
                ) : (
                    // Render a placeholder image or text if profilePic is not available
                    <ProfileSVG/>
                )}
                <UploadOverlay onMouseEnter={handleProfilePicUpload}>
                    <UploadText>Upload Picture</UploadText>
                    <InputFile type="file" ref={fileInputRef} onChange={handlePhotoUpload}/>
                </UploadOverlay>
            </ProfileIconContainer>
            <UserInfoWrapper>
                {/* Username row */}
                <UserInfoRow>
                    <FieldBox>Username</FieldBox>
                    <Separator/>
                    {/* Conditionally render input field or plain text */}
                    <UserInfoText>{editedUser.username}</UserInfoText>
                </UserInfoRow>

                {/* Name row */}
                <UserInfoRow>
                    <FieldBox>Full Name</FieldBox>
                    <Separator/>
                    {editableField === 'firstName' ? (
                        <input
                            type="text"
                            name="firstName"
                            value={editedUser.firstName}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <UserInfoText>{editedUser.firstName}</UserInfoText>
                    )}
                    <EditButton onClick={() => handleEdit('firstName')}/>

                    {/* Last Name */}
                    <Separator/>
                    {editableField === 'lastName' ? (
                        <input
                            type="text"
                            name="lastName"
                            value={editedUser.lastName}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <UserInfoText>{editedUser.lastName}</UserInfoText>
                    )}
                    <EditButton onClick={() => handleEdit('lastName')}/>
                </UserInfoRow>

                {/* Email row */}
                <UserInfoRow>
                    <FieldBox>Email</FieldBox>
                    <Separator/>
                    {editableField === 'email' ? (
                        <input type="text" name="email" value={editedUser.email} onChange={handleInputChange}/>
                    ) : (
                        <UserInfoText>{editedUser.email}</UserInfoText>
                    )}
                    <EditButton onClick={() => handleEdit('email')}/>
                </UserInfoRow>

                {/* University row */}
                <UserInfoRow>
                    <FieldBox>University</FieldBox>
                    <Separator/>
                    {editableField === 'university' ? (
                        <input type="text" name="university" value={editedUser.university}
                               onChange={handleInputChange}/>
                    ) : (
                        <UserInfoText>{editedUser.university}</UserInfoText>
                    )}
                    <EditButton onClick={() => handleEdit('university')}/>
                </UserInfoRow>

                {/* Motto row */}
                <UserInfoRow>
                    <FieldBox>Motto</FieldBox>
                    <Separator/>
                    {editableField === 'motto' ? (
                        <input type="text" name="motto" value={editedUser.motto} onChange={handleInputChange}/>
                    ) : (
                        <UserInfoText>{editedUser.motto}</UserInfoText>
                    )}
                    <EditButton onClick={() => handleEdit('motto')}/>
                </UserInfoRow>

                {/* Bio row */}
                <UserInfoRow>
                    <FieldBox>Bio</FieldBox>
                    <Separator/>
                    {editableField === 'bio' ? (
                        <input type="text" name="bio" value={editedUser.bio} onChange={handleInputChange}/>
                    ) : (
                        <UserInfoText>{editedUser.bio}</UserInfoText>
                    )}
                    <EditButton onClick={() => handleEdit('bio')}/>
                </UserInfoRow>
            </UserInfoWrapper>
            {/* Save button */}
            {editableField && <SaveButton onClick={handleSave}>Save</SaveButton>}
        </StyledUserContainer>
    );
}

export default UserComponent;