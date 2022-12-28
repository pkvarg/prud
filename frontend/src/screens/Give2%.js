import React from 'react'
import { Link } from 'react-router-dom'

const Give2 = () => {
  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <div className='give2-physical'>
        <h1 className='my-3'>DARUJTE 2%</h1>
        <strong>Vážení čitatelia, milí priatelia!</strong>
        <p>
          V roku 2022 sme sa stali prijímateľmi 2%. Aj takouto cestou máte teraz
          možnosť podporiť nás pri propagácii literatúry, organizovaní seminárov
          a konferencií a ďalších našich aktivitách. Za akúkoľvek vašu podporu
          sme vám už teraz vďační.
        </p>
        <strong>Ďakujeme!</strong>
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
