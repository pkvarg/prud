import React, { useState, useEffect } from 'react'
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
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'

const NewBooks = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const params = useParams()
  const year = params.year
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      alert('Recenzia pridaná')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(year))
  }, [dispatch, year, successProductReview])

  const navigate = useNavigate()
  const addToCartHandler = () => {
    navigate(`../cart/${year}?qty=${qty}`)
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
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { products, page, pages } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>
      <div>
        <h1>Knihy {year}</h1>
        <div className='prods-by-year-container'>
          {products.map((product) => (
            <div className='prods-by-year'>
              <Col key={product._id}>
                {product.year == year && (
                  <div className='prod-by-year'>
                    <h1>{product.name}</h1>
                    <h4>Jazyk: {product.language}</h4>
                    <h4>{product.binding}</h4>
                    <h4>{product.pages} strán</h4>
                    <h4>{product.isbn}</h4>
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
                  </div>
                )}
              </Col>
              <Col key={product._id}>
                {product.year == year && (
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className='prod-img-year-width'
                    ></Image>
                  </Link>
                )}
              </Col>
            </div>
          ))}
        </div>
      </div>
      {/* <Row>
        {products.map((product) => (
          <Col key={product._id}>
            {product.name === 'ŠTÚDIUM ŽIVOTA EXODUS I.' && (
              // <Product product={product} />
              <h1>{product.name}</h1>
            )}
          </Col>
        ))}
      </Row> */}
      <Paginate
        pages={pages}
        page={page}
        keyword={keyword ? keyword : ''}
      ></Paginate>
    </>
  )
}

export default NewBooks
