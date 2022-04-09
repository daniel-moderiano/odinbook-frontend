import FocusTrap from 'focus-trap-react';
import { useToastContext } from '../context/ToastContext';
import Button from './utils/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModalEvents } from '../hooks/useModalEvents';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import Input from './utils/Input';

const EditProfileModal = ({ closeModal, profileUser }) => {
  const { showToast } = useToastContext();
  const { user } = useAuthContext();
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAbout, setEditAbout] = useState(false);

  // Custom useEffect-style hook to control modal closing on esc and outside click
  useModalEvents(closeModal);

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

  useEffect(() => {
    if (error) {
      showToast('error', error.errorMsg)
    }
  }, [error,showToast]);

  useEffect(() => {
    if (response) {
      showToast('success', 'Profile information updated');
      closeModal();
      navigate(`/profile/${profileUser._id}`, { state: 'update' });
    }
  }, [profileUser, response, navigate, showToast, closeModal]);

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
    <FocusTrap>
      <div id='Modal' aria-modal="true" role="dialog" aria-labelledby="modal-title" className='flex fixed z-[1000] left-0 top-0 h-full w-full overflow-auto bg-gray-700/70 justify-center items-center'>

        <div className='bg-white w-full max-w-md px-6 py-6 flex flex-col items-start rounded shadow-md max-h-full overflow-auto'>

          <header className='flex flex-col justify-start items-start w-full border-b'>

            <div className='flex justify-between items-center w-full pb-4'>
              <h4 id="modal-title" className='text-xl font-semibold'>Edit profile</h4>
              <button type="button" aria-label="close current window" onClick={closeModal}>
                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1B1E22">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

          </header>

          <div className="w-full mt-6">
            
          <form onSubmit={handleSubmit}>
            
            {/* Show fillable forms when user clicks edit button next to Personal Info header */}
            <fieldset className='mb-3'>
              <legend className='md:text-xl md:pb-1 text-lg border-b mb-4 w-full text-left text-plum-600 flex items-center justify-between'>
                <span>Personal information</span>
                <button data-testid="edit" type='button' className='p-1' onClick={() => setEditPersonal(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4'><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                </button>
              </legend>
  
              {editPersonal ? (
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
                <button type="button" className='p-1' onClick={() => setEditAbout(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4'><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                </button>
              </legend>
            
              
    
              {editAbout ? (
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
      
                  <div className="mb-5">
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
              ) : (
                <div className='max-w-lg mb-4'>
                  {profileUser.bio ? (
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
      </div>
    </FocusTrap>
  )
}

export default EditProfileModal;