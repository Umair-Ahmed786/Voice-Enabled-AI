import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const context_obj = createContext();

const Allstates = (props) => {
const [name,setname] = useState(s1);
s1 = {
    name: 'umair'
}

  return (
    <>
        <context_obj.Provider value={{name}}>
            {props.children}
        </context_obj.Provider>
                
    </>
  )
}

export default Allstates