import React from 'react'
import { Link } from 'react-router-dom'

const Give2Lawyer = () => {
  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <div className='give2-physical'>
        <h1 className='my-5'>PRÁVNICKÉ OSOBY</h1>
        <p>Postup pre právnické osoby</p>
        <ul>
          <li>
            Vypočítajte si 1,0% (2%) z dane z príjmov právnickej osoby. Je to
            maximálna suma, ktorú môžete poukázať v prospech
            prijímateľa/prijímateľov. Môžete poukázať aj menej ako 1,0% (2%),
            musí však byť splnená podmienka minimálne 8 € na jedného
            prijímateľa.
            <p>
              1. V prípade, že právnická osoba (firma) v roku 2020 až do termínu
              na podanie daňového priznania a zaplatenia dane v roku 2021
              (zvyčajne do 31.03.2021) NEDAROVALA financie vo výške minimálne
              0,5% z dane na verejnoprospešný účel (aj inej organizácii, nemusí
              byť iba prijímateľovi), tak môže poukázať iba 1,0% z dane. V
              daňovom priznaní vyznačí, že poukazuje iba 1,0% z dane.
            </p>
            <p>
              2. V prípade, že právnická osoba (firma) v roku 2020 až do termínu
              na podanie daňového priznania a zaplatenia dane v roku 2021
              (zvyčajne do 31.03.2021) DAROVALA financie vo výške minimálne 0,5%
              z dane na verejnoprospešný účel (aj inej organizácii, nemusí byť
              iba prijímateľovi), tak môže poukázať 2% z dane. V daňovom
              priznaní označí, že poukazuje 2% z dane (tak ako po minulé roky).
            </p>
          </li>
          <li>
            V daňovom priznaní pre právnické osoby – časť VI. sú už uvedené
            kolónky na poukázanie 1,0% (2%) z dane v prospech 1 prijímateľa.
          </li>
          <li>
            Údaje o občianskom združení Prúd, ktoré potrebujete uviesť do
            daňového priznania nájdete v úvode tohto článku.
          </li>
          <li>
            Pokiaľ ste si vybrali viac prijímateľov, vložte do daňového
            priznania ďalší list papiera ako prílohu (je uvedená na poslednej
            strane DP) a uveďte tam analogicky všetky potrebné identifikačné
            údaje o prijímateľoch a sumu, ktorú chcete v ich prospech poukázať.
            V kolónke 5 uveďte, koľkým prijímateľom chcete podiel zaplatenej
            dane poukázať.
          </li>
          <li>
            Riadne vyplnené daňové priznanie odošlite elektronicky v lehote,
            ktorú máte na podanie daňového priznania a v tomto termíne aj
            zaplaťte daň z príjmov.
          </li>
          <li>
            Daňové úrady po kontrole údajov a splnení všetkých podmienok majú
            zákonnú lehotu 90 dní na to, aby previedli sumu, ktorú ste
            poukázali, v prospech občianskeho združenia Prúd a v prospech Vami
            vybraných ďalších prijímateľov.
          </li>
          <li>
            <strong>
              Okrem daňového priznania už nepodávate na poukázanie 1% (2%) z
              dane žiadne iné tlačivá, ako napríklad kópie darovacích zmlúv,
              atď. – tie sú dôležité až pri prípadnej kontrole.
            </strong>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Give2Lawyer
