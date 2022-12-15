import React from 'react'
import { Link } from 'react-router-dom'

const Give2PhysicalBusiness = () => {
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
        <h1 className='my-5'>PODNIKATELIA</h1>
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
