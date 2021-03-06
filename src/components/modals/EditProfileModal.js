import { useToastContext } from '../../context/ToastContext';
import Button from '../utils/Button';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import Input from '../utils/Input';
import { useErrorToast } from '../../hooks/useErrorToast';
import FormErrorIcon from '../icons/FormErrorIcon';
import PencilIcon from '../icons/PencilIcon';
import ModalContainer from './ModalContainer';

const EditProfileModal = ({ closeModal, profileUser }) => {
  const { showToast } = useToastContext();
  const { dispatch } = useAuthContext();
  const { updateProfile, response, loading, error, formError } = useUpdateProfile();
  let navigate = useNavigate();

  // Set up notifications
  useErrorToast(error, 'An error occurred while saving changes.');

  const [editPersonal, setEditPersonal] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profileUser.firstName,
    lastName: profileUser.lastName,
    email: profileUser.email,
    occupation: profileUser.bio ? profileUser.bio.occupation : '',
    education: profileUser.bio ? profileUser.bio.education : '',
    location: profileUser.bio ? profileUser.bio.location : '',
  });

  // Handle a successful update operation
  useEffect(() => {
    if (response) {
      // Adjust current user within auth context to updated profile pic user
      dispatch({ type: 'UPDATE', payload: response })
      showToast('success', 'Profile information updated');
      closeModal();
      navigate(`/profile/${profileUser._id}`, { state: 'update' });
    }
  }, [profileUser, response, navigate, showToast, closeModal, dispatch]);

  // Use the name attributes to set the state (ensure names correspond to keys in state object)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(profileUser._id, formData);
  }

  return (
    <ModalContainer modalId="EditProfileModal" title="Edit profile" closeModal={closeModal}>
       <div className='w-full border-t'>
          {/* Display form validation for both sections/fieldsets in a singular location here */}
          {formError && (
            <div className="-mb-4 mt-3">
              {formError.map((error, index) => (
                <div key={index} className="text-sm text-red-700 flex items-center justify-start my-1">
                  <FormErrorIcon iconStyles="w-4 mr-2" />
                  <span>{error.msg}</span>
                </div>
              ))}
            </div>
          )}

          <div className="w-full mt-6">
            <form onSubmit={handleSubmit}>
              <fieldset className='mb-3'>
                <legend className='md:text-xl md:pb-1 text-lg border-b mb-4 w-full text-left text-plum-600 flex items-center justify-between'>
                  <span>Personal information</span>
                  <button data-testid="edit" type='button' className='p-1 rounded active:scale-95 opacity-90 hover:opacity-100 mr-1 outline-plum-600' onClick={() => setEditPersonal(true)}>
                    <PencilIcon iconStyles="w-4 outline-plum-600" iconFill="#6b7280"/>
                  </button>
                </legend>
    
                {editPersonal ? (   // hide form initially, expand only if user clicks edit icon
                  <div className="max-w-lg">
                    <div className="mb-4">
                      <label htmlFor="firstName" className="flex flex-col text-sm md:text-base">
                        First name
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          autocomplete="given-name"
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
                          required
                          autocomplete="family-name"
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
                          required
                          autocomplete="email"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className='max-w-lg mb-4'>
                    <p className='font-semibold'>{profileUser.fullName}</p>
                    <p className='font-semibold'>{profileUser.email}</p>
                  </div>
                )}
              </fieldset>
      
              <fieldset>
                <legend className='md:text-xl md:pb-1 text-lg border-b mb-4 w-full text-left text-plum-600 flex items-center justify-between'>
                  <span>About you</span>
                  <button type="button" className='p-1 rounded active:scale-95 opacity-90 hover:opacity-100 outline-plum-600 mr-1' onClick={() => setEditAbout(true)}>
                    <PencilIcon iconStyles="w-4" iconFill="#6b7280"/>
                  </button>
                </legend>
                  
                {editAbout ? (    // hide form initially, expand only if user clicks edit icon
                  <div className="max-w-lg">
                    <div className="mb-4">
                      <label htmlFor="occupation" className="flex flex-col text-sm md:text-base">
                        Occupation
                        <Input
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          autocomplete="organization-title"
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
                        />
                      </label>
                    </div>
        
                    <div className="mb-5">
                      <label htmlFor="location" className="flex flex-col text-sm md:text-base">
                        Location
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          autocomplete="country-name"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className='max-w-lg mb-4'>
                    {profileUser.bio ? (    // conditionally fill inputs if existing data is present
                      <>
                      {profileUser.bio.occupation && <p className='font-semibold'>{profileUser.bio.occupation}</p>}
                      {profileUser.bio.occupation && <p>Studied at <span className='font-semibold'>{profileUser.bio.education}</span></p>}
                      {profileUser.bio.occupation && <p>Lives in <span className='font-semibold'>{profileUser.bio.location}</span></p>}
                      </>
                    ) : (
                      <p>No information added yet.</p>
                    )}
                  </div>
                )}              
              </fieldset>
      
              <Button customStyles="w-40 md:mt-4 md:mb-2 my-4" design="primary" type="submit">
                {loading ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          </div>
       </div>
    </ModalContainer>
  )
}

export default EditProfileModal;