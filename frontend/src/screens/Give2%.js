import React from 'react'
import { Link } from 'react-router-dom'

const Give2 = () => {
  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <div className='give2-physical'>
        <h1 className='my-3'>
          DARUJTE 2% zo svojich daní občianskemu združeniu Prúd
        </h1>
        <strong>Vážení čitatelia, milí priatelia!</strong>
        <p>
          Tento rok sme prijímateľom 2%. Podporte, prosím, aktivity OZ Prúd
          darovaním 2% z dane. Získané finančné prostriedky budú použité na
          prezentáciu a propagáciu kvalitnej kresťanskej literatúry,
          organizovanie konferencií, seminárov a školení, využívanie technológií
          www a iných služieb internetu.
        </p>
        <strong>Ďakujeme za vašu podporu!</strong>
        <h3 className='my-3'>Údaje o prijímateľovi 2%</h3>
        <p>Obchodné meno (názov): Prúd</p>
        <p>Právna forma: Občianske združenie</p>
        <p>IČO: 36076589</p>
        <p>Sídlo: Špieszova 5, 841 04 Bratislava </p>
      </div>
    </>
  )
}

export default Give2
