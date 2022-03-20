
const ProfileBio = ({ profileUser, profileType }) => {

  return (
    <div className="bg-white p-4 md:p-6 rounded">
      <h2 className="font-bold text-2xl mb-3">About</h2>
      {profileUser.bio.occupation && (
        <div className="flex items-center justify-start mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 mr-3">
            <path fill="#6A70A0CC" d="M320 336c0 8.844-7.156 16-16 16h-96C199.2 352 192 344.8 192 336V288H0v144C0 457.6 22.41 480 48 480h416c25.59 0 48-22.41 48-48V288h-192V336zM464 96H384V48C384 22.41 361.6 0 336 0h-160C150.4 0 128 22.41 128 48V96H48C22.41 96 0 118.4 0 144V256h512V144C512 118.4 489.6 96 464 96zM336 96h-160V48h160V96z"/>
          </svg>
          <p className="font-semibold">{profileUser.bio.occupation}</p>
        </div>
      )}
      {profileUser.bio.education && (
        <div className="flex items-center justify-start mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-5 mr-3">
            <path fill="#6A70A0CC" d="M623.1 136.9l-282.7-101.2c-13.73-4.91-28.7-4.91-42.43 0L16.05 136.9C6.438 140.4 0 149.6 0 160s6.438 19.65 16.05 23.09L76.07 204.6c-11.89 15.8-20.26 34.16-24.55 53.95C40.05 263.4 32 274.8 32 288c0 9.953 4.814 18.49 11.94 24.36l-24.83 149C17.48 471.1 25 480 34.89 480H93.11c9.887 0 17.41-8.879 15.78-18.63l-24.83-149C91.19 306.5 96 297.1 96 288c0-10.29-5.174-19.03-12.72-24.89c4.252-17.76 12.88-33.82 24.94-47.03l190.6 68.23c13.73 4.91 28.7 4.91 42.43 0l282.7-101.2C633.6 179.6 640 170.4 640 160S633.6 140.4 623.1 136.9zM351.1 314.4C341.7 318.1 330.9 320 320 320c-10.92 0-21.69-1.867-32-5.555L142.8 262.5L128 405.3C128 446.6 213.1 480 320 480c105.1 0 192-33.4 192-74.67l-14.78-142.9L351.1 314.4z"/>
          </svg>
          <p>Studied at <span className="font-semibold">{profileUser.bio.education}</span></p>
        </div>
      )}
      {profileUser.bio.location && (
        <div className="flex items-center justify-start mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 mr-3">
            <path fill="#6A70A0CC" d="M273.2 311.1C241.1 271.9 167.1 174.6 167.1 120C167.1 53.73 221.7 0 287.1 0C354.3 0 408 53.73 408 120C408 174.6 334.9 271.9 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1V311.1zM416 503V200.4C419.5 193.5 422.7 186.7 425.6 179.8C426.1 178.6 426.6 177.4 427.1 176.1L543.1 129.7C558.9 123.4 576 135 576 152V422.8C576 432.6 570 441.4 560.9 445.1L416 503zM15.09 187.3L137.6 138.3C140 152.5 144.9 166.6 150.4 179.8C153.3 186.7 156.5 193.5 160 200.4V451.8L32.91 502.7C17.15 508.1 0 497.4 0 480.4V209.6C0 199.8 5.975 190.1 15.09 187.3H15.09zM384 504.3L191.1 449.4V255C212.5 286.3 234.3 314.6 248.2 331.1C268.7 357.6 307.3 357.6 327.8 331.1C341.7 314.6 363.5 286.3 384 255L384 504.3z"/>
          </svg>
          <p>Lives in <span className="font-semibold">{profileUser.bio.location}</span></p>
        </div>
      )}

      {/* Ensure this is always placed at the bottom (has smaller margin for overall even spacing) */}
      <div className="flex items-center justify-start mb-1">
        <svg fill="#6A70A0CC" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 mr-3">
          <path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"/>
        </svg>
        <p>Member since {profileUser.dateJoined}</p>
      </div>
    </div>
  )
}

export default ProfileBio;