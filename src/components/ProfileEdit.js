import Input from './utils/Input';
import Button from './utils/Button';
import { useEffect, useState } from 'react';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useToastContext } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = ({ profileUser }) => {
  const { updateProfile, response, loading, error } = useUpdateProfile();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: profileUser.firstName,
    lastName: profileUser.lastName,
    email: profileUser.email,
    occupation: profileUser.bio ? profileUser.bio.occupation : '',
    education: profileUser.bio ? profileUser.bio.education : '',
    location: profileUser.bio ? profileUser.bio.location : '',
  });

  const { showToast } = useToastContext();

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast]);

  useEffect(() => {
    if (response) {
      showToast('success', 'Profile information updated');
      navigate(`/profile/${profileUser._id}`, { state: 'update' });
    }
  }, [profileUser, response, navigate, showToast]);

  // Use the name attributes to set the state (ensure names correspond to keys in state object)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(profileUser._id, formData);
  }

  return (
    <div className="bg-white p-4 md:py-6 md:px-8 rounded">

      <h2 className="font-bold text-2xl mb-4">Edit profile</h2>

      <form onSubmit={handleSubmit}>
        
       <fieldset className='mb-3'>
        <legend className='md:text-xl md:pb-1 text-lg border-b mb-4 w-full text-left text-plum-600'>Personal information</legend>

          <div className="max-w-lg">
            <div className="mb-4">
              <label htmlFor="firstName" className="flex flex-col text-sm md:text-base">
                First name
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required={true}
                />
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="flex flex-col text-sm md:text-base">
                Last name
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required={true}
                />
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="flex flex-col text-sm md:text-base">
                Email address
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                />
              </label>
            </div>
          </div>
       </fieldset>

        <fieldset>
          <legend className='md:text-xl md:pb-1 text-lg border-b mb-4 w-full text-left text-plum-600'>About you</legend>

          <div className="max-w-lg">
            <div className="mb-4">
              <label htmlFor="occupation" className="flex flex-col text-sm md:text-base">
                Occupation
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
                    
            <div className="mb-4">
              <label htmlFor="education" className="flex flex-col text-sm md:text-base">
                Education
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="flex flex-col text-sm md:text-base">
                Location
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
         
        </fieldset>

        <Button customStyles="w-40 md:mt-4 md:mb-2 my-4" design="primary" type="submit">
          {loading ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </div>
  )
}

export default ProfileEdit;