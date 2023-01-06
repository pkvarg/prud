import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listAllProducts,
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const params = useParams()
  const id = params.id
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useLayoutEffect(() => {
  //   window.scrollTo(0, 250)
  // })

  useLayoutEffect(() => {
    if (successProductReview) {
      alert('Recenzia odoslaná adminovi')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    window.scrollTo(0, 250)

    dispatch(listAllProducts())
  }, [dispatch, id, successProductReview])

  // useEffect(() => {
  //   if (successProductReview) {
  //     alert('Recenzia pridaná')
  //     setRating(0)
  //     setComment('')
  //     dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
  //   }
  //   dispatch(listAllProducts())
  // }, [dispatch, id, successProductReview])

  const navigate = useNavigate()
  const addToCartHandler = () => {
    navigate(`../cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    )
  }

  const continueShopping = () => {
    navigate('/')
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const handleLink = (id) => {
    navigate(`/product/${id}`)
  }

  const commentHandler = (comment) => {
    setComment(comment)
  }

  return (
    <>
      <Link className='btn btn-back my-3' onClick={() => navigate(-1)}>
        Naspäť
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {products.map(
            (product) =>
              product._id === id && (
                <>
                  <Meta title={product.name} />
                  <Row>
                    <Col md={3} key={product._id}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        className='prod-img-width'
                      ></Image>
                      <ListGroup.Item
                        className='product-see-also no-mobile'
                        key={product._id}
                      >
                        <h5>Katalóg</h5>
                        <h6>{product.catalog}</h6>
                        {product.related && <h5>Pozrite si tiež</h5>}

                        {product.related && (
                          <Form onClick={() => handleLink(product.related.id)}>
                            <h6 className='related-link'>
                              {product.related.name}
                            </h6>
                          </Form>
                        )}
                        {product.related2 && (
                          <Form onClick={() => handleLink(product.related2.id)}>
                            <h6 className='related-link'>
                              {product.related2.name}
                            </h6>
                          </Form>
                        )}
                        {product.related3 && (
                          <Form onClick={() => handleLink(product.related3.id)}>
                            <h6 className='related-link'>
                              {product.related3.name}
                            </h6>
                          </Form>
                        )}

                        <h5>Hmotnosť</h5>
                        <h6>{product.weight}kg</h6>
                        <h5>Tagy</h5>
                        <h6>{product.tags}</h6>
                        <h5>Väzba</h5>
                        <h6>{product.binding}</h6>
                        <h5>Počet strán</h5>
                        <h6>{product.pages}</h6>
                        <h5>ISBN:</h5>
                        <h6>{product.isbn}</h6>

                        <h5>Jazyk</h5>
                        {product.language === 'SK' ? (
                          <Image
                            src='/images/flag_sk40px_0.png'
                            alt={product.name}
                            fluid
                          ></Image>
                        ) : (
                          <Image
                            src='/images/flag_cz40px_2_27.png'
                            alt={product.name}
                            fluid
                          ></Image>
                        )}
                        {product.excerpt.excerpt && (
                          <Link to={`/library/${product._id}`}>
                            <h5 className='prod-to-library related-link'>
                              Do čitárne
                            </h5>
                          </Link>
                        )}
                      </ListGroup.Item>
                    </Col>
                    <Col md={6}>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h3>{product.name}</h3>
                          <h4>{product.author}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          Cena: €{addDecimals(product.price)}
                        </ListGroup.Item>
                        <ListGroup.Item className='product-description'>
                          Popis: {product.description}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={3}>
                      <Card>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row>
                              <Col>Cena :</Col>
                              <Col>
                                {product.discount ? (
                                  <h5 className='discounted-price'>
                                    <span className='discounted-price-span'>
                                      Zľava {product.discount}%
                                    </span>
                                    €{addDecimals(product.discountedPrice)}
                                  </h5>
                                ) : (
                                  <h4>€{addDecimals(product.price)}</h4>
                                )}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col>Status:</Col>
                              <Col>
                                {product.countInStock > 0
                                  ? 'Na sklade'
                                  : 'Vypredané'}
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          {product.countInStock > 0 && (
                            <ListGroup.Item>
                              <Row>
                                <Col>Počet:</Col>
                                <Col>
                                  <Form.Control
                                    as='select'
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                  >
                                    {[
                                      ...Array(product.countInStock).keys(),
                                    ].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}

                          <ListGroup.Item>
                            <Button
                              onClick={addToCartHandler}
                              className='w-100 btn-red'
                              type='button'
                              disabled={product.countInStock === 0}
                            >
                              Pridať do košíka
                            </Button>
                          </ListGroup.Item>
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
                </>
              )
          )}
          <Container>
            {products.map(
              (product) =>
                product._id === id && (
                  <ListGroup.Item
                    className='product-see-also mobile-only'
                    key={product._id}
                  >
                    <h5>Katalóg</h5>
                    <h6>{product.catalog}</h6>
                    {product.related && <h5>Pozrite si tiež</h5>}

                    {product.related && (
                      <Form onClick={() => handleLink(product.related.id)}>
                        <h6 className='related-link'>{product.related.name}</h6>
                      </Form>
                    )}
                    {product.related2 && (
                      <Form onClick={() => handleLink(product.related2.id)}>
                        <h6 className='related-link'>
                          {product.related2.name}
                        </h6>
                      </Form>
                    )}
                    {product.related3 && (
                      <Form onClick={() => handleLink(product.related3.id)}>
                        <h6 className='related-link'>
                          {product.related3.name}
                        </h6>
                      </Form>
                    )}

                    <h5>Hmotnosť</h5>
                    <h6>{product.weight}</h6>
                    <h5>Tagy</h5>
                    <h6>{product.tags}</h6>
                    <h5>Väzba</h5>
                    <h6>{product.binding}</h6>
                    <h5>Počet strán</h5>
                    <h6>{product.pages}</h6>
                    <h5>ISBN:</h5>
                    <h6>{product.isbn}</h6>
                    <h5>Jazyk</h5>
                    {product.language === 'SK' && (
                      <Image
                        src='/images/flag_sk40px_0.png'
                        alt={product.name}
                        fluid
                      ></Image>
                    )}
                    {product.language === 'CZ' && (
                      <Image
                        src='/images/flag_cz40px_2_27.png'
                        alt={product.name}
                        fluid
                      ></Image>
                    )}
                    {product.excerpt.excerpt && (
                      <Link to={`/library/${product._id}`}>
                        <h5 className='prod-to-library related-link'>
                          Do čitárne
                        </h5>
                      </Link>
                    )}
                  </ListGroup.Item>
                )
            )}
          </Container>

          <Row>
            {products.map(
              (product) =>
                product._id === id && (
                  <Col md={6} key={product._id}>
                    <h2 className='my-3'>Recenzie</h2>
                    {product.reviews.length === 0 && (
                      <Message>Žiadne recenzie</Message>
                    )}
                    <ListGroup variant='flush'>
                      {product.reviews.map(
                        (review) =>
                          review.isAcknowledged === true && (
                            <ListGroup.Item
                              key={review._id}
                              className='review-items'
                            >
                              <strong>{review.name}</strong>
                              <p>{review.comment}</p>
                            </ListGroup.Item>
                          )
                      )}
                      <ListGroup.Item>
                        <h2>Napíšte recenziu</h2>
                        {errorProductReview && (
                          <Message variant='danger'>
                            {errorProductReview}
                          </Message>
                        )}
                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='comment'>
                              <Form.Label>Komentár</Form.Label>
                              <Form.Control
                                as='textarea'
                                row='3'
                                value={comment}
                                onChange={(e) => commentHandler(e.target.value)}
                                className='review-stop'
                              ></Form.Control>
                            </Form.Group>
                            <Button type='submit' className='my-3 btn-blue'>
                              Odoslať
                            </Button>
                          </Form>
                        ) : (
                          <Message>
                            Prosím <Link to='/login'>Prihláste sa</Link> pre
                            napísanie recenzie
                          </Message>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                )
            )}
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
