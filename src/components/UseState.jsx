import React, { useContext } from 'react'
import {context_obj} from './Allstates'

const UseState = () => {
    const {name} = useContext(context_obj);
  return (
    <>
   <div>
        fMy name is {name}
    </div> 
    </>
  )
}

export default UseState