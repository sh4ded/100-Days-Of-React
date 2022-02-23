import React from 'react'

const Display = ({ name, number}) => {
  return <p>{name} {number}</p>;
};

const Person = ({persons}) => { return (
	persons.map((e) => (
        <Display key={e.id} name={e.name} number={e.number}/>
      ))
	)
}

export default Person