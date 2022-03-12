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
  classCSS: "mt-2 border rounded-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring-2 ring-transparent ring-offset-4 ring-offset-yellow-500/40 focus:border-yellow-500/80",
  required: false,
}

export default TextInput;