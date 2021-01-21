import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './styles.scss';

interface IInputBox {
    list: any[]
    getCatBreed: (props: string) => void
}

const InputBox = ({list, getCatBreed}: IInputBox) => {

    const handleChange = (event: any) => {
        const name = event.target.value;
        getCatBreed(name);
    }

  return (
    <Form.Group className="box" controlId="exampleForm.ControlSelect1">
      <Form.Label>Breed</Form.Label>
      <Form.Control as="select" onChange={handleChange}>
        {list.map(cat => (
          <option value={cat.name} key={cat.id}>{cat.name}</option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default InputBox;