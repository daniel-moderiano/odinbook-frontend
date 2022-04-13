const Toast = ({ visible, params }) => {

  // Class is dynamically set according to toast params and visible boolean
  return (
    <div role="status" aria-hidden={visible ? false : true} className={`flex items-center justify-start z-20 ${params.type === 'error' && 'bg-red-600'} ${params.type === 'success' && 'bg-green-600'} text-white mb-24 py-3 pl-4 w-72 rounded shadow-[0_5px_5px_-3px_rgb(0,0,0,0.16),_0_8px_10px_1px_rgb(0,0,0,0.11),_0_3px_14px_2px_rgb(0,0,0,0.10)] fixed top-20 right-4  transition-opacity duration-300 pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mr-4">
        {params.type === 'error' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6">
           <path fill="#FFFFFF" d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
         </svg>
        )}

        {params.type === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6">
            <path fill="#FFFFFF" d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
          </svg>
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