import { useToastContext } from '../../context/ToastContext';
import CloseIcon from '../icons/CloseIcon';
import TickIcon from '../icons/TickIcon';
import CircleWithCrossIcon from '../icons/CircleWithCrossIcon';

const Toast = ({ visible, params }) => {
  const { setToastVisible } = useToastContext();

  // Class is dynamically set according to toast params and visible boolean
  return (
    <div role="status" aria-hidden={visible ? false : true} className={`flex items-center justify-start z-20 ${params.type === 'error' && 'bg-red-600'} ${params.type === 'success' && 'bg-green-600'} text-white mb-24 py-3 pl-4 w-72 rounded shadow-[0_5px_5px_-3px_rgb(0,0,0,0.16),_0_8px_10px_1px_rgb(0,0,0,0.11),_0_3px_14px_2px_rgb(0,0,0,0.10)] fixed top-20 right-4  transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <button aria-label='Close notification' onClick={() => setToastVisible(false)} className={`${visible ? 'visible' : 'invisible'}`}>
        <CloseIcon iconStyles="w-8 absolute top-0 right-0 p-2" iconFill="#FFF"/>
      </button>
      <div className="mr-4">
        {params.type === 'error' && (
         <CircleWithCrossIcon iconFill="#FFFFFF" iconStyles="w-6"/>
        )}

        {params.type === 'success' && (
          <TickIcon iconFill="#FFFFFF" iconStyles="w-6"/>
        )}
      </div>
      <div className="max-w-[200px]">
        {params.type === 'error' && (
          <p className="font-semibold">Error</p>
        )}
        {params.type === 'success' && (
          <p className="font-semibold">Success!</p>
        )}
        <p className="text-sm">{params.message}</p>
      </div>
    </div>
  )
};

export default Toast