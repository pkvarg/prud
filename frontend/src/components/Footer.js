import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Prúd{' '}
            <a
              href='https://www.pictusweb.sk'
              target='_blank'
              rel='noreferrer'
              className='footer-link'
            >
              &#60;&#47;&#62; Pictusweb Development
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
