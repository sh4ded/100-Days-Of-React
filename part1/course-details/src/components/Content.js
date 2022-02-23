import React from 'react'
import Part from './Part'
import Sum from './Sum'

const Content = ({content}) => {
	return (
	<>
	<ul>
	{content.map(e => <Part key={e.id} name={e.name} exercise={e.exercises} />)}
	</ul>
	<Sum sum={content.reduce((result, it) => result + it.exercises, 0)} />
	</>
	)
}

export default Content