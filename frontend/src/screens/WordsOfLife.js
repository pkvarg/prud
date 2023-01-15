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

      <div className='podcast'>
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
          className='btn-subcategory'
          onClick={() => subHandler('Boh v liste Rimanom')}
        >
          Boh v liste Rimanom
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Boží evangelium')}
        >
          Boží evangelium
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Charakter Pánovho pracovníka')}
        >
          Charakter Pánovho pracovníka
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Človek a dva stromy')}
        >
          Človek a dva stromy
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Evanjelium kráľovstva')}
        >
          Evanjelium kráľovstva
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Fakt víra a prožitek')}
        >
          Fakt víra a prožitek
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Hlavné Kristove kroky')}
        >
          Hlavné Kristove kroky
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('KŘESŤANSKÝ ŽIVOT')}
        >
          KŘESŤANSKÝ ŽIVOT
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristovo vzkriesenie')}
        >
          Kristovo vzkriesenie
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristus ako zľutovnica')}
        >
          Kristus ako zľutovnica
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Naplnenie starého zákona')}
        >
          Naplnenie starého zákona
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Nevystihnuteľné Kristovo bohatstvo')}
        >
          Nevystihnuteľné Kristovo bohatstvo
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O človeku')}
        >
          O človeku
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O Duchu')}
        >
          O Duchu
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O Kristovi')}
        >
          Kristovi
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Porátať sa s hriechmi')}
        >
          Porátať sa s hriechmi
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Porátať sa so svetom')}
        >
          Porátať sa so svetom
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Poselství evangelia')}
        >
          Poselství evangelia
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Prožívání Krista')}
        >
          Prožívání Krista
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('ŘADA PRO NOVÉ VĚŘÍCÍ')}
        >
          ŘADA PRO NOVÉ VĚŘÍCÍ
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Rok milosti')}
        >
          Rok milosti
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() =>
            subHandler('Skúsenosti veriacich s Kristovým vzkriesením')
          }
        >
          Skúsenosti veriacich s Kristovým vzkriesením
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Skúsenosť života')}
        >
          Skúsenosť života
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Spasenie')}
        >
          Spasenie
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Štruktúra Božieho evanjelia')}
        >
          Štruktúra Božieho evanjelia
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Svedomie')}
        >
          Svedomie
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Trojnásobné semeno')}
        >
          Trojnásobné semeno
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Učenie apoštolov')}
        >
          Učenie apoštolov
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Udeľovanie života')}
        >
          Udeľovanie života
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('VĚČNÝ BOŽÍ PLÁN')}
        >
          VĚČNÝ BOŽÍ PLÁN
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Vzoprieť sa satanovi')}
        >
          Vzoprieť sa satanovi
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('ZÁKLADNÍ PRVKY KŘESŤANSKÉHO ŽIVOTA')}
        >
          ZÁKLADNÍ PRVKY KŘESŤANSKÉHO ŽIVOTA
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Zjevení života')}
        >
          Zjevení života
        </button>
      </div>

      <AudioPlayer subcategory={subcategory} />
    </>
  )
}

export default WordsOfLife
