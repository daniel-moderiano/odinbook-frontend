// Basic text input component with default yellow ring styling
const Input = (props) => {
  const { id, name, value, onChange, classCSS, required, type } = props;
  return (
    <input 
      type={type} 
      id={id} 
      name={name} 
      value={value}
      onChange={onChange}
      required={required}
      className={classCSS}
    />
  )
}

Input.defaultProps = {
  classCSS: "mt-2 border rounded-sm border-slate-300 py-2 px-3 focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-plum-300/30 focus:border-plum-400",
  required: false,
  type: 'text'
}

export default Input;