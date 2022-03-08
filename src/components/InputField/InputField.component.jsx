import React from 'react'
import './Input.component.css';

const InputField = ({ type, placeholder, name, value, onChange }) => {
    return (
        <input type={type} placeholder={placeholder} required name={name} value={value} onChange={onChange} />
    )
}

export default InputField