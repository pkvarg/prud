import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FC'
import { forgotPasswordAction } from '../actions/userActions'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)

  const origURL = window.location.host

  const dispatch = useDispatch()

  const forgotPassword = useSelector((state) => state.forgotPassword)
  const { loading, error } = forgotPassword

  const submitHandler = (e) => {
    e.preventDefault()
    if (!email) {
      setMessage('Musíte zadať existujúci email')
    } else {
      dispatch(forgotPasswordAction(email, origURL))
      console.log(email, origURL)
      setMessageSuccess('Linka bola odoslaná na Váš email')
    }
  }

  return (
    <FormContainer>
      <h1>Zadajte svoj email</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {messageSuccess && <Message variant='success'>{messageSuccess}</Message>}

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Váš email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3 btn-green'>
          Poslať
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ForgotPasswordScreen
