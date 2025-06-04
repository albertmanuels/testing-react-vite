import { useState } from 'react'
import './App.css'
import { kebabCaseToTitleCase } from './helpers'

function App() {
  const [buttonColor, setButtonColor] = useState("medium-violet-red")
  const [isDisabled, setIsDisabled] = useState(false)
  const nextColorClass = buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red"
  const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass)
  const classname = isDisabled ? "gray" : buttonColor

  return (
    <div>
      <button 
        className={classname} 
        disabled={isDisabled} 
        onClick={() => setButtonColor(nextColorClass)}
        >
          Change to {nextColorTitleCase}
      </button>
      <input 
        type="checkbox" 
        id='disable-button-checkbox' 
        checked={isDisabled} 
        defaultChecked={false} 
        onChange={(e) => {
          setIsDisabled(e.target.checked)
        }} 
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  )
}

export default App
