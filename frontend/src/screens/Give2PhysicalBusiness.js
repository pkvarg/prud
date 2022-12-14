import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { forgotPasswordAction } from '../actions/userActions'

const Give2PhysicalBusiness = () => {
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
      setMessageSuccess('Linka bola odoslaná na Váš email')
    }
  }

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <h1>PODNIKATELIA</h1>
      <p>Postup pre fyzické osoby, ktoré si samy podávajú daňové priznanie</p>
    </>
  )
}

export default Give2PhysicalBusiness
