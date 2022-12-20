import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'
import { Button } from 'react-bootstrap'

const WordsOfLife = () => {
  const [subcategory, setSubcategory] = useState()
  const subHandler = (sub) => {
    setSubcategory(sub)
  }

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <div className='give2-physical'>
        <h1 className='my-3'>Poslucháreň</h1>
        <h3 className='my-3'>SLOVÁ ŽIVOTA A PRAVDY</h3>
        <p>
          Relácia Slová života a pravdy, ktorú odvysielalo Rádio 7 je založená
          na krátkych úryvkoch z kníh Watchmana Nee a Witnessa Lee. Jednotlivé,
          zhruba 15 minútové nahrávky prezentujú publikácie oboch autorov, ktoré
          prinášajú svieži pohľad na pravdu zjavenú v Písme z hľadiska božského
          života, z ktorého sa tešia všetci veriaci v Krista.{' '}
        </p>
      </div>
      <div className='subcategories'>
        <Button
          className='my-2'
          onClick={() => subHandler('Boh v liste Rimanom')}
        >
          Boh v liste Rimanom
        </Button>
        <Button className='my-2' onClick={() => subHandler('Boží evangelium')}>
          Boží evangelium
        </Button>
      </div>

      <AudioPlayer subcategory={subcategory} />
    </>
  )
}

export default WordsOfLife
