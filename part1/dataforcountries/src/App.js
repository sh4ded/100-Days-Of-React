import { useState, useEffect } from "react";
import axios from 'axios'
import Lang from './components/Lang'
import Show from './components/Show'

const App = () => {
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const result = countries.reduce((res, it, i) => {
      res[i] = it.name.common
      return res}, 
      []);
    const filtered = result.filter(e => e.toLowerCase().includes(event.target.value.toLowerCase()))
    if (event.target.value === "")
    {
      setResults([])
      setError("")
    }
    else if (filtered.length > 10)
    {
      setResults([])
      setError(["Too many matches, specify another filter"])
    }
    else{
      setError("")
      setResults(filtered)
  }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div>find countries <input value={search} onChange={handleSearch}/>
    </div>
    </form>
    <p>{error}</p>
    {results.map(e => (
      <Show key={e} timee={results.length} value={e} data={countries.filter(el => el.name.common === e)}/>
      ))
  }
     </>)
    };


export default App;
