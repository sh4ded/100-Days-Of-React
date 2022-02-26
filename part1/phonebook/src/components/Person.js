import React from 'react'
import { useState } from 'react'
import addNumber from '../services/numbers.js'

const Display = ({ id, name, number, persons, modify, cache, cmod}) => {

  const [deleted, setDeleted] = useState(false)
  const deleteNumber = () => {
    const res = window.confirm(`Delete ${name}`)
    if (res)
    {
    addNumber
    .remove(id)
    .then(emptyNumber =>
    {
      console.log(emptyNumber)
      setDeleted(true)
      modify(persons.filter(e => e.id !== id))
      cmod(cache.filter(e => e.id !== id))
    })
  }
}
  if (!deleted)
  {
  return (
    <>
    <p>{name} {number} 
    <button onClick={deleteNumber}>delete</button>
    </p>
    </>
    );
}
else{
  return null
}
};

const Person = ({ persons, modify, cache, cmod}) => { return (
	persons.map((e) => (
        <Display key={e.id} id={e.id} name={e.name} number={e.number} persons={persons} modify={modify}
        cache={cache} cmod={cmod}/>
      ))
	)
}

export default Person