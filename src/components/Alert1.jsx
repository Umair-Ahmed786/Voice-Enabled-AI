import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Alert1 = ({message}) => {
  return (
    <>
        <div className="container">
        <Alert key='danger' variant='danger'>
       <b>Warning: </b>{message}
      </Alert>
        </div>
    </>
  )
}

export default Alert1