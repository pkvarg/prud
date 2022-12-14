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
      <div className='give2-physical'>
        <h1>PODNIKATELIA</h1>
        <p>Postup pre fyzické osoby, ktoré si samy podávajú daňové priznanie</p>
        <ul>
          <li>
            V Daňovom priznaní fyzických osôb TYP A - VIII. oddiel a v Daňovom
            priznaní fyzických osôb TYP B – XII. oddiel tlačiva vyplňte údaje
            pre OZ Prúd, ktoré nájdete v úvode tohto článku a sumu Vami
            vypočítaných percent z dane:
            <p>
              1. 2% zo svojej zaplatenej dane - ide o maximálnu sumu, ktorú
              môžete poukázať v prípade, že ste v minulom roku neboli
              dobrovoľníkom, alebo ste dobrovoľnícky odpracovali menej ako 40
              hodín. Minimálna výška tejto sumy je však 3 €.
            </p>
            <p>
              2. 3% zo svojej zaplatenej dane – týka sa len osôb, ktoré v
              minulom roku dobrovoľnícky odpracovali minimálne 40 hodín. V
              tlačive označte políčko „Spĺňam podmienky na poukázanie 3% z dane“
              a potvrdenie o tom od organizácie, resp. organizácií, v ktorých
              ste pôsobili, priložte ako Prílohu k daňovému priznaniu.
            </p>
            <p>3. Nezabudnite sa podpísať!</p>
          </li>
        </ul>
        <p>
          Daňové priznanie fyzických osôb TYP A a TYP B si môžete stiahnuť na
          webovej stránke{' '}
          <a
            href='https://www.financnasprava.sk'
            target='_blank'
            rel='noreferrer'
            className='no-underline blue'
          >
            www.financnasprava.sk{' '}
          </a>
        </p>
        <ul>
          <li>
            Riadne vyplnené daňové priznanie (ak ste v minulom roku odpracovali
            ako dobrovoľník minimálne 40 hodín aj potvrdenie od organizácie,
            resp. organizácií) doručte v lehote, ktorú máte na podanie daňového
            priznania (zvyčajne do 31.03.2021) na Váš daňový úrad buď
            elektronicky cez portál Finančnej správy, alebo ak nemáte povinnosť
            elektronickej komunikácie, tak podľa Vášho bydliska, v tomto termíne
            aj zaplaťte daň z príjmov.
          </li>
          <li>
            Daňové úrady po kontrole údajov a splnení všetkých podmienok majú
            zákonnú lehotu 90 dní na to, aby previedli sumu, ktorú ste
            poukázali, v prospech občianskeho združenia Prúd.
          </li>
        </ul>
      </div>
    </>
  )
}

export default Give2PhysicalBusiness
