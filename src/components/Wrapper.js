import React from 'react'
import Input from "./Input/Input";
import Training from "./Training/Training";
import { useSelector } from 'react-redux'

const Wrapper = () => {
    const display = useSelector((state) => state.display);
    return (
        <div>
            {display.form 
                ? <><Input /><Training /></>
                : <><Training /><Input /></>
            }
        </div>
    )
}

export default Wrapper
