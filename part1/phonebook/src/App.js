import { useState, useEffect } from "react";
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import addNumber from './services/numbers'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [cachePersons, setCachePersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [addMessage, setAddMessage] = useState(null);
  

  useEffect(() => {
    addNumber
    .getAll()
    .then(initialNumbers => {
      console.log(initialNumbers)
      setPersons(initialNumbers)
      setCachePersons(initialNumbers)
    })
  }, [])

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
      setAddMessage(`${newName} is already added to phonebook`);
      setTimeout(() => {
        setAddMessage(null)
      }, 5000)
    }
    else if (persons.reduce((result, it) => result | (it.name === newName && it.number !== newNumber), false)) {
      const res = window.confirm(`${newName} is already added to phonebook. Want to replace old number with new number?`)
      if (res)
      {
      const upd = persons.filter(e => e.name === newName)[0].id
      const updNumber = {
        id: upd,
        name: newName,
        number: newNumber
      }
      addNumber
      .update(upd, updNumber)
      .then(returnedPersons => {
        setPersons(returnedPersons)
        setCachePersons(returnedPersons.filter(e => e.name.toLowerCase().includes(newSearch.toLowerCase())))
        setAddMessage(`details of ${newName} updated`)
        setTimeout(() => {
      setAddMessage(null)
    }, 5000)
      })
      .catch(error => {
        setAddMessage(`${newName} has been deleted :(`)
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
        })
      .then(response => {
        addNumber
        .getAll()
        .then(initialNumbers => {
          setPersons(initialNumbers)
          setCachePersons(initialNumbers.filter(e => e.name.toLowerCase().includes(newSearch.toLowerCase())))
        }
      )}
      )
    }
    }
    else
    {
      const newPerson = {
          name: newName,
          number: newNumber
        }
      addNumber
      .create(newPerson)
      .then(addedNumber => {
        console.log(addedNumber)
      setPersons(addedNumber)
      setCachePersons(addedNumber.filter(e => e.name.toLowerCase().includes(newSearch.toLowerCase())))
    setAddMessage(`${newName} added`)
    setTimeout(() => {
      setAddMessage(null)
    }, 5000)
    })
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
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
      <Person persons={cachePersons} modify={setCachePersons}
      cache={persons} cmod={setPersons}/>
    </div>
  );
};

export default App;
