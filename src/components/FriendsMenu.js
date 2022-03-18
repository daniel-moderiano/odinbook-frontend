import { Link } from 'react-router-dom'

const FriendsMenu = () => {
  // Define a variable that captures the url of the current page. This is used as a conditional to apply an 'active' or 'current page' styling to the friends menu
  let page = window.location.pathname;

  return (
    <aside className="mt-3 md:bg-white md:h-full md:m-0 md:fixed md:w-[270px] md:shadow-md lg:w-[320px]">
      <h2 className='hidden md:block text-2xl font-bold p-4'>Friends</h2>
      <nav role="navigation" aria-label="Friends menu">
        <ul className='flex items-center justify-start ml-1 md:flex-col md:m-0 md:mx-2'>
          <li className='md:w-full'>
            <Link className={`rounded px-3 py-1 m-1 text-sm font-bold flex items-center justify-start hover:bg-gray-100 ${page === '/friends' ? 'bg-teal-650 md:bg-gray-100 text-white' : 'bg-white md:bg-white md:text-plum-600 md:shadow-none shadow-sm'} md:text-black md:m-0 md:h-full md:w-full md:py-3 md:text-lg md:font-semibold`} to="/friends">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='hidden md:block w-5 mr-3'>\
                <path fill='#404164' d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"/>
              </svg>
              <span>Suggested</span>
            </Link>
          </li>
          <li className='md:w-full'>
            <Link className={`flex items-center justify-start rounded px-3 py-1 m-1 text-sm font-bold hover:bg-gray-100 ${page === '/friends/requests' ? 'bg-teal-650 md:bg-gray-100 text-white' : 'bg-white md:bg-white md:text-plum-600 md:shadow-none shadow-sm'} md:text-black md:m-0 md:h-full md:w-full md:py-3 md:text-lg md:font-semibold`} to="/friends/requests">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='hidden md:block w-5 mr-3'>
                <path fill='#404164' d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/>
              </svg>
              <span>Friend requests</span>
            </Link>
          </li>
          <li className='md:w-full'>
            <Link className={`flex items-center justify-start rounded  px-3 py-1 m-1 text-sm font-bold hover:bg-gray-100 ${page === '/friends/all' ? 'bg-teal-650 md:bg-gray-100 text-white' : 'bg-white md:bg-white md:text-plum-600 md:shadow-none shadow-sm'} md:text-black md:m-0 md:h-full md:w-full md:py-3 md:text-lg md:font-semibold`} to="/friends/all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='hidden md:block w-5 mr-3'>
                <path fill='#404164' d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/>
              </svg>
              <span>All friends</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default FriendsMenu;