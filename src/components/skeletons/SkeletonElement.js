// Base components of a larger skeleton layouts. Can accept type prop for simple building blocks of common skeleton layouts.
const SkeletonElement = ({ type }) => {
  let classStyles = 'bg-gray-200 ';

  switch (type) {
    case 'text':
      classStyles += 'w-full h-3 rounded my-2';
      break;

    case 'text-sm':
      classStyles += 'w-full h-2 rounded my-2';
      break;

    case 'avatar':
      classStyles += 'w-10 h-10 rounded-full my-4 shrink-0';
      break;
    
    case 'avatar-square':
      classStyles += 'w-24 h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 shrink-0 rounded';
      break;

    case 'avatar-sm':
      classStyles += 'w-8 h-8 rounded-full shrink-0';
      break;
  
    case 'avatar-lg':
      classStyles += 'w-20 h-20 rounded-full my-4 shrink-0';
      break;

    case 'avatar-full':
      classStyles += 'w-20 h-20 rounded-full my-4 shrink-0 lg:w-36 lg:h-36 lg:mt-7';
      break;

    default:
      break;
  }

  return (
    <div data-testid="skeleton" className={classStyles}></div>
  )
}

export default SkeletonElement;