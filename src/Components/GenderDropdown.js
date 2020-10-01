import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'


function GenderDropdown(props) {
  return(
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Please Select Gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={e => props.genderFn("men")}>Men</Dropdown.Item>
        <Dropdown.Item onClick={e => props.genderFn("women")} >Women</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GenderDropdown;