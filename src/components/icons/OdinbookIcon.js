const OdinbookIcon = ({ iconFill, iconStyles }) => {
  return (
    <svg aria-labelledby="odinbook-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.22 83.68" className={iconStyles}>
      <title id="odinbook-logo" >Odinbook</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <rect fill={iconFill} className="cls-1" width="105.22" height="83.68" />
          <path fill="#fff" className="cls-2" d="M15.36,48.09c0-11.74,8.07-18.43,17.28-18.43s17.28,6.69,17.28,18.43c0,11.59-8.06,18.29-17.28,18.29S15.36,59.68,15.36,48.09Zm28.44,0c0-8.07-4.46-13.47-11.16-13.47S21.48,40,21.48,48.09,26,61.41,32.64,61.41,43.8,56.08,43.8,48.09Z" />
          <path fill="#fff" className="cls-2" d="M62.88,61.63h-.22l-.57,3.88H57.34V14.25h6v14L63,35h.22A17.2,17.2,0,0,1,75,29.66c9.43,0,14.54,7,14.54,17.78,0,12-7.49,18.94-15.77,18.94C70.3,66.38,66.12,64.58,62.88,61.63ZM83.4,47.51c0-7.7-2.88-12.81-9.86-12.81-3.1,0-6.7,1.58-10.23,5.18V57.31a14.67,14.67,0,0,0,9.44,4C78.79,61.34,83.4,56.15,83.4,47.51Z" />
        </g>
      </g>
    </svg>
  )
}

OdinbookIcon.defaultProps = {
  iconFill: '#51557d'
}

export default OdinbookIcon;