import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className='footer-text'>
          <Row>
            <Col>
              <div className='footer-text-links '>
                <h2>Informácie</h2>
                <Link to='/about'>
                  <p>O nás</p>
                </Link>
                <Link to='/contact'>
                  <p>Kontaktujte nás</p>
                </Link>
              </div>
            </Col>
            <Col>
              <div className='footer-text-links '>
                <h2>Podmienky</h2>
                <Link to='/gdpr'>
                  <p>GDPR</p>
                </Link>
                <Link to='/trade-rules'>
                  <p className='footer-trade-rules'>Obchodné podmienky</p>
                </Link>
              </div>
            </Col>
            <Col>
              <div className='footer-text-links '>
                <h2>Váš účet</h2>
                <Link to='/login?redirect=/profile'>
                  <p>Objednávky</p>
                </Link>
                <Link to='/forgot-password'>
                  <p className='footer-trade-rules'>Zabudnuté heslo</p>
                </Link>
              </div>
            </Col>
            <Col>
              <div className='footer-text-links '>
                <h2>Kontakt Slovensko</h2>
                {/* <p>Prúd</p> */}
                <p>Špieszova 5</p>
                <p>84104 Bratislava</p>
                <a href='mailto:publikacie@prud.sk'>
                  <p>publikacie@prud.sk</p>
                </a>

                <a href='tel:+421904060262'>
                  <p>+421 904 060 262</p>
                </a>

                {/* <p>www.prud.sk</p> */}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Container>
        <Row>
          <Col className='py-3'>
            <div className='footer-copyright no-mobile'>
              <p>
                Copyright &copy; {Date().substring(11, 15)} PRÚD, všetky práva
                vyhradené,
              </p>
              <a
                href='https://www.lsm.org'
                target='_blank'
                rel='noreferrer'
                className='footer-link'
              >
                s povolením LIVING STREAM MINISTRY
              </a>
              <a
                href='https://www.pictusweb.sk'
                target='_blank'
                rel='noreferrer'
                className='footer-link'
              >
                &#60;&#47;&#62; PICTUSWEB Development
              </a>
            </div>

            <div className='footer-copyright mobile-only'>
              <p>Copyright &copy; {Date().substring(11, 15)} PRÚD,</p>
              <p>všetky práva vyhradené,</p>
              <p> s povolením</p>
              <a
                href='https://www.lsm.org'
                target='_blank'
                rel='noreferrer'
                className='footer-link'
              >
                LIVING STREAM MINISTRY
              </a>
              <a
                href='https://www.pictusweb.sk'
                target='_blank'
                rel='noreferrer'
                className='footer-link'
              >
                &#60;&#47;&#62; PICTUSWEB Development
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
