// Basic text input component with default yellow ring styling
const TextInput = (props) => {
  const { id, name, value, onChange, classCSS, required } = props;
  return (
    <input 
      type="text" 
      id={id} 
      name={name} 
      value={value}
      onChange={onChange}
      required={required}
      className={classCSS}
    />
  )
}

TextInput.defaultProps = {
  classCSS: "mt-2 border rounded-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400",
  required: false,
}

export default TextInput;