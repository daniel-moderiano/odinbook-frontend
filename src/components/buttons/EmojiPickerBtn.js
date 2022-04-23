import { useState } from "react";
import Picker from 'emoji-picker-react';

// Creating an accessible button that opens the Emoji picker component
// The third party emoji picker itself is hardly accessible which is a pain in the ass. For the purposes of this project it is acceptible, but in a production app this would be removed and generated from scratch
const EmojiPickerBtn = ({ onEmojiClick, modal }) => {
  const [showPicker, setShowPicker] = useState(false);

  // Add accessible handlers for enter and space key press
  const handleKeyPress = (e) => {
    const openBtn = document.querySelector('#openPicker');
    if (e.key === 'Enter' || e.key === ' ') {
      openBtn.click();
    }
  }

  // Containing div is a relative parent to the picker to allow absolute positioning of the picker. It is set up as a button and therefore has explicitly set focus and keypress handlers for accessibility.
  return (    
    <div 
      id="openPicker"
      className='hidden lg:block relative py-1 px-2 rounded hover:bg-gray-100 hover:cursor-pointer mr-1 outline-plum-600' 
      onClick={() => setShowPicker((prevState) => !prevState)}
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyPress}
      aria-haspopup="menu"
      aria-label="Open emoji picker"
    >🙂
      {showPicker && (
        <div role="menu" aria-label="Emoji picker">
          <Picker 
            onEmojiClick={onEmojiClick}
            native={true}
            disableSearchBar={true}
            groupVisibility={{
              recently_used: false,
            }}
            pickerStyle={{ 
              height: modal ? '200px' : '300px', 
              position: 'absolute',
              left: modal && '50%',
              bottom: modal ? '100%' : '38px',
              right: !modal && '0',
            }}
          />
        </div>
      )}
    </div>

  )
}

export default EmojiPickerBtn;