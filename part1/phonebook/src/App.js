import { useState, useEffect } from "react";
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [cachePersons, setCachePersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setCachePersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const tempSearch = event.target.value;
    setNewSearch(tempSearch);
    if (tempSearch.length > 0)
    {
    const tempPersons = persons.filter(e => e.name.toLowerCase().includes(tempSearch.toLowerCase()));
    setCachePersons(tempPersons);
  }else
  {
    setCachePersons(persons);
  }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.reduce((result, it) => result | (it.name === newName && it.number === newNumber), false)) {
      alert(`${newName} is already added to phonebook`);
    }
    else
    {
      setPersons(
        persons.concat({
          id: persons.length+1,
          name: newName,
          number: newNumber
        })
      );
      if (newName.toLowerCase().includes(newSearch.toLowerCase()))
      {
      setCachePersons(
        cachePersons.concat({
          id: persons.length+1,
          name: newName,
          number: newNumber
        })
      );
    }
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
      <Filter value={newSearch} onChange={handleSearch} />
      <h2>Add new</h2>
      <Form valueName={newName} onChangeName={handleNameChange}
      valueNumber={newNumber} onChangeNumber={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Person persons={cachePersons} />
    </div>
  );
};

export default App;
