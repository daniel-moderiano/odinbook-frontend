import { useState } from "react";
import Picker from 'emoji-picker-react';

// Creating an accessible button that opens the Emoji picker component
// ! The third party emoji picker itself is hardly accessible which is a pain in the ass. For the purposes of this project it is acceptible, but in a production app this would be removed and generated from scratch
const EmojiPickerBtn = ({ onEmojiClick }) => {
  const [showPicker, setShowPicker] = useState(false);

  // Add accessible handlers for enter and space key press
  const handleKeyPress = (e) => {
    console.log(e.key);
    const openBtn = document.querySelector('#openPicker');
    if (e.key === 'Enter' || e.key === ' ') {
      openBtn.click();
    }
  }

  return (
    <div 
      id="openPicker"
      className='relative py-1 px-2 rounded hover:bg-gray-100 hover:cursor-pointer mr-1 outline-plum-600' 
      onClick={() => setShowPicker((prevState) => !prevState)}
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyPress}
      aria-haspopup="menu"
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
              height: '200px', 
              position: 'absolute',
              left: '100%',
              bottom: '100%'
            }}
          />
        </div>
      )}
    </div>

  )
}

export default EmojiPickerBtn;