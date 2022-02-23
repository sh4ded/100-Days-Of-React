import React from 'react'

const Form = ({valueName, onChangeName, valueNumber, onChangeNumber}) => {
	return (
		<>
	<div>
          name: <input value={valueName} onChange={onChangeName} />
        </div>
        <div>
        number: <input value={valueNumber} onChange={onChangeNumber} />
        </div>
        </>
      )
}

export default Form