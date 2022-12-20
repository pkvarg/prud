import React from 'react'
import { Link } from 'react-router-dom'
import AudioPlayer2 from '../components/AudioPlayer2'

const LifeStudy = () => {
  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <div className='give2-physical'>
        <h1 className='my-3'>Poslucháreň</h1>

        <h3 className='my-3'>ŠTÚDIUM ŽIVOTA</h3>
        <p>
          20 minútové relácie, z cyklu Štúdium života v Biblii sa venujú
          rozsiahlemu dielu Witnessa Lee - Štúdium života v Biblii. Štúdium
          života v Biblii je obsiahle a klasické knižne vydané dielo, ktoré
          stavia na všetkom, čo Pán zjavil Svojej cirkvi v priebehu minulých
          storočí až do dnes. So svojimi viac ako 25 000 stranami komentárov ku
          všetkým knihám Biblie sa radí medzi najbohatšie súčasné a aktuálne
          výklady biblickej pravdy.
        </p>
      </div>
      <AudioPlayer2 />
    </>
  )
}

export default LifeStudy
