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
  // const params = useParams()
  // const productId = params.id
  const navigate = useNavigate()

  const [discount, setDiscount] = useState('')
  /* All Products Dropdown content*/
  const productList = useSelector((state) => state.productList)
  // const { products } = productList

  const dispatch = useDispatch()

  // const productDetails = useSelector((state) => state.productDetails)
  // const { loading, error, product } = productDetails

  // useEffect(() => {
  //   dispatch({ type: CREATE_DISCOUNT_SUCCESS })
  //   setDiscount(discount)
  //   // navigate('/admin/productlist')
  // }, [dispatch, discount])

  const submitHandler = () => {
    dispatch(
      createDiscount({
        discount: discount,
      })
    )
  }

  console.log(discount)
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-back my-3'>
        Naspäť
      </Link>
      <FormContainer>
        <h1>Nová akcia na všetky produkty</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='discount-value'>
            <Form.Label>Výška akcie bez %</Form.Label>
            <Form.Control
              type='Number'
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
