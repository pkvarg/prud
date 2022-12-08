import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const productId = params.id
  const qty = new URLSearchParams(location.search).get('qty')
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    navigate('/cart')
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const continueShopping = () => {
    navigate('/')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Nákupný košík</h1>
        {cartItems.length === 0 ? (
          <Message>
            Váš košík je prázdny{' '}
            <Link to='/' className='cart-empty-back-link'>
              Naspäť
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className='no-underline'
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>€ {addDecimals(item.price)}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Položiek (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
              </h2>
              Produkty: €
              {cartItems
                .reduce((acc, item) => acc + Number(item.qty * item.price), 0)
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  Poštovné: €
                  {cartItems
                    .reduce(
                      (acc, item) => acc + Number(item.qty * item.price),
                      0
                    )
                    .toFixed(2) > 100
                    ? 0
                    : addDecimals(3.5)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Celkom: €
                  {addDecimals(
                    Number(
                      cartItems.reduce(
                        (acc, item) => acc + Number(item.qty * item.price),
                        0
                      )
                    ) +
                      Number(
                        cartItems.reduce(
                          (acc, item) => acc + Number(item.qty * item.price),
                          0
                        ) > 100
                          ? 0
                          : 3.5
                      )
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            {cartItems.length > 0 && (
              <ListGroup.Item>
                <Button
                  type='button'
                  className='w-100 btn-red'
                  disabled={cartItems.lenght === 0}
                  onClick={checkoutHandler}
                >
                  Do pokladne
                </Button>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                onClick={continueShopping}
                className='w-100 btn-blue'
                type='button'
              >
                Pokračovať v nákupe
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
