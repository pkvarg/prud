import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  // Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  // DEFINE SHIPPING PRICE and TAX HERE
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : addDecimals(3.5))
  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  // cart.totalPrice = (
  //   Number(cart.itemsPrice) +
  //   Number(cart.shippingPrice) +
  //   Number(cart.taxPrice)
  // ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [navigate, success])

  // send by email
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  //const orderToEmailName = userInfo.name
  const orderEmailToEmail = userInfo.email

  const [message, setMessage] = useState(null)

  /* prod quantities TO update countInStock */
  let prodsQtys = {}
  cart.cartItems.map((item, index) => {
    const productId = cart.cartItems[index].product
    const productQty = Number(cart.cartItems[index].qty)
    return (prodsQtys[index] = { product: productId, qty: productQty })
  })

  let prodsDiscounts = {}
  cart.cartItems.map((item, index) => {
    const productId = cart.cartItems[index].product
    const productDiscount = Number(cart.cartItems[index].discount)
    return (prodsDiscounts[index] = {
      product: productId,
      discount: productDiscount,
    })
  })

  const placeOrderhandler = () => {
    if (gdrpOrderChecked && tradeRulesOrderChecked) {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          user: userInfo.name,
          name: cart.shippingAddress.name,
          email: orderEmailToEmail,
          qtys: prodsQtys,
          discounts: prodsDiscounts,
        })
      )
    } else {
      setMessage('Potvr??te s??hlas ni????ie')
    }
  }

  const [gdrpOrderChecked, setGdprOrderChecked] = useState(false)
  const handleGdprOrder = () => {
    setGdprOrderChecked(!gdrpOrderChecked)
  }

  const [tradeRulesOrderChecked, setTradeRulesOrderChecked] = useState(false)
  const handleTradeRulesOrder = () => {
    setTradeRulesOrderChecked(!tradeRulesOrderChecked)
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Link className='btn btn-back my-3' to='/payment'>
        Nasp???? na Sp??sob platby
      </Link>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Doru??enie</h2>
              <p>
                <strong>Pr??jemca: </strong>
                {cart.shippingAddress.name}, {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
              {cart.shippingAddress.billingName && (
                <div>
                  <h4>Faktura??n?? ??daje</h4>
                  <p>
                    {cart.shippingAddress.billingName},{' '}
                    {cart.shippingAddress.billingAddress},{' '}
                    {cart.shippingAddress.billingPostalCode},{' '}
                    {cart.shippingAddress.billingCity},{' '}
                    {cart.shippingAddress.billingCountry}
                    {cart.shippingAddress.billingICO && (
                      <div>
                        I??O:
                        {cart.shippingAddress.billingICO}, DI??:
                        {cart.shippingAddress.billingDIC}
                      </div>
                    )}
                  </p>
                </div>
              )}
              {cart.shippingAddress.note && (
                <h5>Pozn??mka: {cart.shippingAddress.note}</h5>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Platba</h2>
              <strong>Sp??sob platby: </strong>
              {cart.paymentMethod === 'Hotovos??'
                ? 'Hotovos?? pri prevzat??'
                : 'PayPal alebo karta'}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Objednan?? produkty: </h2>
              {cart.cartItems.length === 0 ? (
                <Message>V???? ko????k je pr??zdny</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          {item.discount > 0 ? (
                            <h5 className='place-order-discount'>
                              Z??ava {item.discount}%
                            </h5>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col md={4}>
                          {item.qty} x ???{item.price.toFixed(2)} = ???
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>S??hrn objedn??vky</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Produkty</Col>
                  <Col>??? {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Po??tovn??</Col>
                  <Col>??? {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Z??ava...
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Celkom</Col>
                  <Col>??? {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                <Form.Group className='billing-flex'>
                  <Form.Check
                    type='checkbox'
                    name='gdprCheck'
                    required
                    onChange={handleGdprOrder}
                  />
                  <p className='agree-gdpr-order'>
                    <a href='/safety-privacy' target='_blank'>
                      S??hlas??m so spracovan??m osobn??ch ??dajov
                    </a>
                  </p>
                </Form.Group>
                <Form.Group className='billing-flex'>
                  <Form.Check
                    type='checkbox'
                    name='tradeRulesCheck'
                    required
                    onChange={handleTradeRulesOrder}
                  />
                  <p className='agree-traderules-order'>
                    <a href='/trade-rules' target='_blank'>
                      S??hlas??m s obchodn??mi podmienkami
                    </a>
                  </p>
                </Form.Group>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block w-100 btn-blue'
                  disabled={cart.items === 0}
                  onClick={placeOrderhandler}
                >
                  Z??v??zne objedna??
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
