import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FC'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [name, setName] = useState(shippingAddress.name)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  // Billing Address
  const [billingName, setBillingName] = useState(shippingAddress.billingName)

  const [billingAdress, setBillingAddress] = useState(
    shippingAddress.billingAddress
  )
  const [billingCity, setBillingCity] = useState(shippingAddress.billingCity)
  const [billingPostalCode, setBillingPostalCode] = useState(
    shippingAddress.billingPostalCode
  )
  const [billingCountry, setBillingCountry] = useState(
    shippingAddress.billingCountry
  )

  const [billingICO, setBillingICO] = useState(shippingAddress.billingICO)

  const [billingDIC, setBillingDIC] = useState(shippingAddress.billingDIC)

  const [showOrnot, setShowOrNot] = useState('hidden')
  const [showOrnotICO, setShowOrNotICO] = useState('hidden')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ name, address, city, postalCode, country }))
    navigate('/payment')
  }

  const showBilling1 = (e) => {
    setShowOrNot('show')
  }
  const showBilling2 = (e) => {
    setShowOrNotICO('show')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Doručenie</h1>
      <h2>Doručovacia adresa:</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Meno a priezvisko</Form.Label>
          <Form.Control
            type='text'
            placeholder='Meno a priezvisko'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type='text'
            placeholder='Adresa'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>Mesto</Form.Label>
          <Form.Control
            type='text'
            placeholder='Mesto'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>PSČ</Form.Label>
          <Form.Control
            type='text'
            placeholder='PSČ'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Štát</Form.Label>
          <Form.Control
            type='text'
            placeholder='Štát'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-5 billing-flex'>
          <Form.Check
            type='radio'
            aria-label='radio 1'
            name='billingCheck'
            onChange={showBilling1}
          />
          <h2>Fakturačná adresa je iná ako doručovacia</h2>
        </Form.Group>
        <div className={showOrnot}>
          <Form.Group controlId='billingName'>
            <Form.Label>Meno a priezvisko / Firma</Form.Label>
            <Form.Control
              type='text'
              placeholder='Meno a priezvisko / Firma'
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='billingAddress'>
            <Form.Label>Fakturačná adresa</Form.Label>
            <Form.Control
              type='text'
              placeholder='Fakturačná adresa'
              value={billingAdress}
              onChange={(e) => setBillingAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='billingCity'>
            <Form.Label>Mesto</Form.Label>
            <Form.Control
              type='text'
              placeholder='Mesto'
              value={billingCity}
              onChange={(e) => setBillingCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='billingPostalCode'>
            <Form.Label>PSČ</Form.Label>
            <Form.Control
              type='text'
              placeholder='PSČ'
              value={billingPostalCode}
              onChange={(e) => setBillingPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='billingCountry'>
            <Form.Label>Štát</Form.Label>
            <Form.Control
              type='text'
              placeholder='Štát'
              value={billingCountry}
              onChange={(e) => setBillingCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='billing-flex'>
            <Form.Check
              type='radio'
              aria-label='radio 1'
              name='billingCheck'
              onChange={showBilling2}
            />
            <h2 className='my-5'>IČO a DIČ</h2>
          </Form.Group>
          <div className={showOrnotICO}>
            <Form.Group controlId='billingICO'>
              <Form.Label>IČO</Form.Label>
              <Form.Control
                type='text'
                placeholder='IČO'
                value={billingICO}
                onChange={(e) => setBillingICO(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='billingDIC'>
              <Form.Label>DIČ</Form.Label>
              <Form.Control
                type='text'
                placeholder='DIČ'
                value={billingDIC}
                onChange={(e) => setBillingDIC(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </div>
        </div>

        <Button type='submit' className='my-3 btn-green'>
          Pokračovať
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
