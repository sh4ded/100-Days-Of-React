import { useState } from "react";

const Title = ({name}) => {
  return(
    <h1>{name}</h1>
    )
}

const Display = ({text, value}) => {
  if (value !== '')
    return (
  <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>
  )
  return(
    <p>{text}</p>)
}

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>{text}</button>
  )

const Statistics = ({good, neutral, bad}) => {
  if ((good+neutral+bad)>0){
  const val  = good*100/(good+neutral+bad) + '%'
  return(
    <>
    <table>
    <tbody>
    <Display text='good' value={good} />
    <Display text='neutral' value={neutral} />
    <Display text='bad' value={bad} />
    <Display text='all' value={good+neutral+bad} />
    <Display text='avg' value={(good+neutral+bad)/3}/>
    <Display text='positive' value={val}/>
    </tbody>
    </table>
    </>
    )
}
return(
  <>
  <Display text="No feedback given" value='' />
  </>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const HandleGoodClick = () => setGood(good+1)
  const HandleNeutralClick = () => setNeutral(neutral+1)
  const HandleBadClick = () => setBad(bad+1)

  return (
    <>
    <Title name = 'give feedback' />
    <Button handleClick={HandleGoodClick} text='good'/>
    <Button handleClick={HandleNeutralClick} text='neutral'/>
    <Button handleClick={HandleBadClick} text='bad'/>
    <Title name = 'statistics' />
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
