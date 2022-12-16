import React from 'react'
import { Link } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'

const WordsOfLife = () => {
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
      <AudioPlayer />
    </>
  )
}

export default WordsOfLife
