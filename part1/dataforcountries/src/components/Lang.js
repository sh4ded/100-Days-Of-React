import react from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Lang = ({state, select}) => {
	const [weather, setWeather] = useState([])
	const API_key = process.env.REACT_APP_API_KEY
	const hook1 = () => {
	axios
	.get(`https://api.openweathermap.org/data/2.5/weather?q=${select.capital}&appid=${API_key}`)
	.then(response => {
		setWeather(response.data)
	})
	}
	useEffect(hook1, [])
	if (state === "true")
	{
	if (select.name.common === "")
	{
		return null
	}
	else{
	const it = Object.keys(select.languages);

	return (
	<>
	<h1>{select.name.common}</h1>
  <p>capital {select.capital}</p>
  <p>area {select.area}</p>
  <ul>
  {it.map(e => <li key={e}>{select.languages[e]}</li>)}
  </ul>
  <img src={select.flags.png} />
  <h1>Weather in {select.capital}</h1>
  <p>Temperature {weather.main.temp} Fahrenheit</p>
  </>
  )
}
}
else{
	return null
}
}

export default Lang;