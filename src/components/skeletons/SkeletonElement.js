// Base components of a larger skeleton layout. Can accept ype prop for simple building blocks of common skeleton layouts.

const SkeletonElement = ({ type }) => {
  let classStyles = 'bg-gray-200 my-4 ';

  switch (type) {
    case 'text':
      classStyles += 'w-full h-4 rounded';
      break;

    case 'title':
      classStyles += 'w-6/12 h-8 mb-6 rounded';
      break;

    case 'avatar':
      classStyles += 'w-24 h-24 rounded-full';
      break;

    case 'thumbnail':
      classStyles += 'w-24 h-24 rounded';
      break;

    default:
      break;
  }

  return (
    <div className={classStyles}></div>
  )
}

export default SkeletonElement;