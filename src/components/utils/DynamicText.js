
const DynamicText = ({ states, textOptions, styles }) => {
  // Based on the current values of each state, return the text that matches this state
  const selectTextOption = () => {
    // Order of states evaluated is important! Loading always comes before error or response
    if (states.loading) {
      return textOptions.loading;
    }
    if (states.loading) {
      return textOptions.loading;
    }
    if (states.loading) {
      return textOptions.loading;
    }
    
    // Naturally the default option becomes the default return
    return textOptions.default;
  }

  return (
    <p className={styles}>{selectTextOption()}</p>
  )
}

export default DynamicText;