import { useState, useEffect } from "react";

const Signup = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="Signup">
      <div className="Signup-header">
        <h2 className="Signup-title">Sign up</h2>
      </div>  

      <form className="Signup-form">
        <label htmlFor="firstName" className="form-label">
          First name
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="lastName" className="form-label">
          Last name
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={formData.lastName}
            onChange={handleChange}
          />  
        </label>

        <label htmlFor="email" className="form-label">
          Email address
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password" className="form-label">
          Password
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="confirmPassword" className="form-label">
          Confirm password
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>

        <button type="submit" />
      </form>
    </div>
  )
}

export default Signup;