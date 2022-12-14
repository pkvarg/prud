import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createDiscount } from '../actions/productActions'
import { CREATE_DISCOUNT_SUCCESS } from '../constants/productConstants'

const CreateDiscount = () => {
  const navigate = useNavigate()

  const [discount, setDiscount] = useState('')
  const [messageSuccess, setMessageSuccess] = useState(null)

  const dispatch = useDispatch()

  const submitHandler = () => {
    dispatch(
      createDiscount({
        discount: discount,
      })
    )
    if (discount > 0) {
      setMessageSuccess(`Akcia vytvorená`)
    } else {
      setMessageSuccess(`Akcia zrušená`)
    }
  }

  console.log(discount)
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-back my-3'>
        Naspäť
      </Link>
      <FormContainer>
        <h1>Nová akcia na všetky produkty</h1>
        {messageSuccess && (
          <Message variant='success'>{messageSuccess}</Message>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='discount-value'>
            <Form.Label>
              Výška akcie bez %. Akciu možno zrušiť zadaním 0.
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='zľava'
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='my-5 btn-blue' type='submit' variant='primary'>
            Vytvoriť
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default CreateDiscount
