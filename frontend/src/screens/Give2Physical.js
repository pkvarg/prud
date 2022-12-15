import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { forgotPasswordAction } from '../actions/userActions'

const Give2Physical = () => {
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

  const file1 = '2022_priloha_c_1_ziadost_o_rocne_zuctovanie.pdf'
  const file2 = '2022_priloha_c_2_potvrdenie_o_zaplateni_dane.pdf'
  const file3 = '2022_priloha_c_3_vyhlasenie_o_poukazani_dane.pdf'
  const file4 = '2022_priloha_c_3a_poucenie_k_vyhlaseniu_o_poukazani_dane.pdf'
  const downloadFileHandler = (fileName) => {
    console.log(fileName)
    fetch(`${fileName}`).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob)
        // Setting various property values
        let alink = document.createElement('a')
        alink.href = fileURL
        alink.download = `${fileName}`
        alink.click()
      })
    })
  }

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>
      <div className='give2-physical'>
        <h1>FYZICKÉ OSOBY</h1>
        <strong>Postup pre fyzické osoby – zamestnancov</strong>
        <p>
          (Postup pre fyzické osoby, ktoré si samy podávajú daňové priznanie
          <a href='/give2-physical-business' className='no-underline blue '>
            {' '}
            nájdete tu
          </a>
          )
        </p>

        <ul>
          <li>
            Požiadajte svojho zamestnávateľa o vykonanie ročného zúčtovania
            zaplatených preddavkov na daň (príloha č. 1 Žiadosť o vykonanie
            ročného zúčtovania preddavkov).
          </li>
          <li>
            Po vykonaní zúčtovania požiadajte zamestnávateľa, aby Vám vystavil
            tlačivo Potvrdenie o zaplatení dane za minulý rok (príloha č. 2
            Potvrdenie o zaplatení dane).
          </li>
          <li>
            Vyplňte Vyhlásenie o poukázaní 2% z dane pre OZ Prúd (príloha č. 3
            Vyhlásenie o poukázaní dane) podľa poučenia (príloha č. 3a Poučenie
            k Vyhláseniu o poukázaní dane).
          </li>
          <li>
            {' '}
            Potvrdenia o zaplatení dane zistíte potrebné údaje na vyplnenie
            Vyhlásenia o poukázaní dane, t. j. dátum zaplatenia dane a sumu
            zaplatenej dane na výpočet príslušných percent:
            <p>
              1. 2% zo svojej zaplatenej dane - ide o maximálnu sumu, ktorú
              môžete poukázať v prípade, že ste v minulom roku neboli
              dobrovoľníkom, alebo ste dobrovoľnícky odpracovali menej ako 40
              hodín. Minimálna výška tejto sumy je však 3 €.{' '}
            </p>
            <p>
              2. 3% zo svojej zaplatenej dane – týka sa len osôb, ktoré v
              minulom roku dobrovoľnícky odpracovali minimálne 40 hodín.
              Potvrdenie o tom od organizácie, resp. organizácií, v ktorých ste
              pôsobili, je povinnou prílohou k vyhláseniu a potvrdeniu o
              zaplatení dane.
            </p>
          </li>
          <li>
            Vyplnené Vyhlásenie o poukázaní 2% a tlačivo Potvrdenie o zaplatení
            dane (dobrovoľníci s počtom aspoň 40 odpracovaných hodín za minulý
            rok aj s potvrdením od príslušnej organizácie, resp. organizácií)
            doručte do 30.04.2022 na Daňový úrad podľa miesta svojho trvalého
            bydliska, nie podľa sídla zamestnávateľa.
          </li>
          <li>
            Po splnení podmienok majú daňové úrady 90 dní na prevedenie 2% alebo
            3% v prospech občianskeho združenia Prúd.
          </li>
        </ul>
        <div className='my-5'>
          <strong>Potrebné tlačivá nájdete pod článkom</strong>
          <p>Príloha č. 01 - Žiadosť o ročné zúčtovanie</p>
          <p>Príloha č. 02 - Potvrdenie o zaplatení dane</p>
          <p>Príloha č. 03 - Vyhlásenie o poukázaní dane</p>
          <p>Príloha č. 03a - Poučenie k Vyhláseniu o poukázaní dane</p>
        </div>
        <div className='my-5'>
          <strong>Úpravy pre dobrovoľníkov</strong>
          <p>
            V prípade, že fyzická osoba (zamestnanec alebo živnostník) pre
            akúkoľvek neziskovú organizáciu alebo jednotlivca (prijímateľa
            dobrovoľníckej činnosti) počas minulého roka odpracovala ako
            dobrovoľník aspoň 40 hodín a táto organizácia/jednotlivec o tom vydá
            Potvrdenie o výkone dobrovoľníckej činnosti, môže fyzická osoba
            venovať až 3% zo svojej dane! V tom prípade vo Vyhlásení vypočítajte
            3% zo svojej dane a k Vyhláseniu priložte okrem Potvrdenia o
            zaplatení dane aj Potvrdenie o výkone dobrovoľníckej činnosti.
            Dobrovoľník nemusel odpracovať 40 hodín výlučne v prospech jedinej
            organizácie/ jednotlivca. Počet minimálne 40 hodín tak môže
            „vyskladať“ aj z viacerých Potvrdení od viacerých
            organizácií/jednotlivcov.
          </p>
        </div>

        <div className='files-btns my-5'>
          <strong>Súbory na stiahnutie:</strong>

          <Button
            className='btn-file'
            onClick={() => downloadFileHandler(file1)}
          >
            Žiadosť o ročné zúčtovanie
          </Button>
          <Button
            className='btn-file'
            onClick={() => downloadFileHandler(file2)}
          >
            Potvrdenie o zaplatení dane
          </Button>
          <Button
            className='btn-file'
            onClick={() => downloadFileHandler(file3)}
          >
            Vyhlásenie o poukázaní dane
          </Button>
          <Button
            className='btn-file'
            onClick={() => downloadFileHandler(file4)}
          >
            Poučenie k vyhláseniu o poukázaní dane
          </Button>
        </div>
      </div>
    </>
  )
}

export default Give2Physical
