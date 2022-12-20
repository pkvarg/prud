import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'

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
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Boh v liste Rimanom')}
        >
          Boh v liste Rimanom
        </button>
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Boží evangelium')}
        >
          Boží evangelium
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Charakter Pánovho pracovníka')}
        >
          Charakter Pánovho pracovníka
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Človek a dva stromy')}
        >
          Človek a dva stromy
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Evangelium kráľovstva')}
        >
          Evangelium kráľovstva
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Fakt víra a prožitek')}
        >
          Fakt víra a prožitek
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Hlavné Kristove kroky')}
        >
          Hlavné Kristove kroky
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Kresťanský život')}
        >
          Kresťanský život
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Kristovo vzkriesenie')}
        >
          Kristovo vzkriesenie
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Kristus ako zľutovnica')}
        >
          Kristus ako zľutovnica
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Naplnenie starého zákona')}
        >
          Naplnenie starého zákona
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('Nevystihnuteľné Kristovo bohatstvo')}
        >
          Nevystihnuteľné Kristovo bohatstvo
        </button>{' '}
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('O človeku')}
        >
          O človeku
        </button>
        <button
          className='my-2 btn-subcategory'
          onClick={() => subHandler('O Duchu')}
        >
          O Duchu
        </button>
      </div>

      <AudioPlayer subcategory={subcategory} />
    </>
  )
}

export default WordsOfLife
