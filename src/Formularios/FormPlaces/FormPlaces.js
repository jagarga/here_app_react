import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormCheckInput from 'react-bootstrap/FormCheckInput';

class FormPlaces extends Component {
  
  render() {

    var onChangeGeo = this.props.changeGeocode;
    var onSetGeo = this.props.gotoGeocode;

    return <div>

<Form className="border rounded border-info" style={{padding:'20px', boxShadow: '1px 1px #71a0f2'}}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Direccion</Form.Label>
    <Form.Control onChange= { onChangeGeo } type="text" placeholder="name@example.com" />
    <Button variant="info" onClick= { onSetGeo } style={{marginTop:'12px'}}>Mostrar</Button>
  </Form.Group>
</Form>
{/* 
<DropdownButton id="dropdown-item-button" title="Dropdown button">
  <Dropdown.Item as="button">Action</Dropdown.Item>
  <Dropdown.Item as="button">Another action</Dropdown.Item>
  <Dropdown.Item as="button">Something else</Dropdown.Item>
</DropdownButton>


<Form>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
</Form> */}

    </div>;
  }
}

export default FormPlaces;
