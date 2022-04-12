// Base components of a larger skeleton layout. Can accept ype prop for simple building blocks of common skeleton layouts.

const SkeletonElement = ({ type }) => {
  let classStyles = 'bg-gray-200 ';

  switch (type) {
    case 'text':
      classStyles += 'w-full h-3 rounded my-2';
      break;

    case 'text-sm':
      classStyles += 'w-full h-2 rounded my-2';
      break;

    case 'title':
      classStyles += 'w-6/12 h-8 mb-6 rounded my-4';
      break;

    case 'avatar':
      classStyles += 'w-10 h-10 rounded-full my-4 shrink-0';
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

    case 'thumbnail':
      classStyles += 'w-10 h-10 rounded my-4';
      break;

    case 'button':
      classStyles += 'w-28 h-8 my-4';
      break;

    default:
      break;
  }

  return (
    <div data-testid="skeleton" className={classStyles}></div>
  )
}

export default SkeletonElement;