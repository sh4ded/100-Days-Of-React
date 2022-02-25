import react from 'react'
import {useState, useEffect} from 'react'
import Lang from './Lang'


const Show = ({value, timee, data}) => {
    const [show, setShow] = useState("show")
    const [state, setState] = useState("false")

    const handleShow = (event) => {
    if (show === "show")
    {
        setShow("hide")
        setState("true")
    }
    else{
        setShow("show")
        setState("false")
    }
}
    useEffect(() => {
  const timer = setTimeout(() => {
    if (timee <= 1)
    {
        setState("true")
    }
    else{
        setState("false")
    }
  }, 1000);
  return () => clearTimeout(timer);
}, [data]);

if (timee > 1)
{
    return(
	<>
      <p>{value} &nbsp;
      <button value={value} onClick={handleShow}>{show}</button>
      </p>
      <Lang state={state} select={data[0]} />
      </>
      )
}
else{
    return(
    <>
      <p>{value}</p>
      <Lang state={state} select={data[0]} />
      </>
      )
}
}

export default Show