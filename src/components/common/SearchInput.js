import React from 'react'

export  function SearchInput({value, handleChange,placeholder}) {
  return (
    <input
      type="text"
      name="search"
      placeholder={placeholder}
      className="searchinput"
      value={value}
      onChange={(event) => {
        handleChange(event.target.value)
      }}
    />
  )
}
