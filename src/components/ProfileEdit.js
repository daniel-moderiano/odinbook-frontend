import Input from './utils/Input';
import Button from './utils/Button';
import { useState } from 'react';

const ProfileEdit = ({ profileUser }) => {
  const [formData, setFormData] = useState({
    occupation: '',
    education: '',
    location: '',
  });

  // Use the name attributes to set the state (ensure names correspond to keys in state object)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <h2 className="font-bold text-2xl mb-3">About</h2>
      <form onSubmit={handleSubmit}>

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

        <Button customStyles="w-40 mt-6" design="primary" type="submit">Save changes</Button>
      </form>
    </div>
  )
}

export default ProfileEdit;