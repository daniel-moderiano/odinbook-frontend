// Custom stylesheet is required as Tailwind does not support this level of customising file inputs
import '../styles/imageUpload.css';
import ImageIcon from './icons/ImageIcon'

const ImageUploadBtn = ({ handleChange, imageValue, setImageValue, setImageFile }) => {
  return (
    // Accepts only the formats specified
    <>
      <label htmlFor="image" className='file-label'>
        <input data-testid="input" type="file" value={imageValue} name="image" id="image" accept='.jpg, .jpeg, .png' className="file-input" onChange={(e) => {
          setImageValue(e.target.value);
          setImageFile(e.target.files[0]);
          handleChange(e);
        }}/>
        <ImageIcon iconFill='#50547C' iconStyles='w-6 mr-2'/>
        Add image
      </label>

    </>

    
  )
}

export default ImageUploadBtn