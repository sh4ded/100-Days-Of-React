import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const votess = new Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votess)

  const vote  = () => {
    const copy = [...votes]
    copy[selected] += 1
    return setVotes(copy)
  }
  const generateRandom = () => {
    return setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const findmax =() => {
    var vi = -1
    var ai = -1
    for(var i = 0; i < anecdotes.length; i++)
    {
      if (votes[i] > vi)
      {
        vi = votes[i]
        ai = i
      }
    }
    return ai
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={generateRandom}>next anecdote</button>
      <button onClick={vote}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[findmax()]}</p>
      <p>has {votes[findmax()]} votes</p>
    </div>
  )
}

export default App