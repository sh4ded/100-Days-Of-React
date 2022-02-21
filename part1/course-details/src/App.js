import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <p>This app needs button to be pressed :)</p>
      )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
    )
}

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>{text}</button>
  )

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const HandleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const HandleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <>
      {left}
      <Button handleClick = {HandleLeftClick} text='left'/>
      <Button handleClick = {HandleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks}/>
    </>
  );
};

export default App;
