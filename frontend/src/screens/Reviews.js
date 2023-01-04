import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const Reviews = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const pageSize = 10
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm('Delete review? Are you sure?')) {
      // dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = (product) => {
    dispatch(createProduct())
  }

  const linkToCreateDiscount = () => {
    navigate('/create-discount')
  }

  const acknowledgeHandler = (id) => {
    alert('Recenzia schválená')

    console.log('ack')
  }

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber, pageSize))
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  return (
    <>
      {products.map(
        (product) =>
          product.numReviews > 0 && (
            <>
              <h2 key={product._id} className='manage-single-review-title'>
                Titul: {product.name}
              </h2>

              {product.reviews.map((review) => (
                <div className='manage-single-review'>
                  "{review.comment}" napísal {review.name}
                  <button
                    className='btn-blue reviews'
                    onClick={() => acknowledgeHandler(product._id)}
                  >
                    Schváliť recenziu
                  </button>
                  <button
                    className='btn-red reviews'
                    onClick={() => deleteHandler(product._id)}
                  >
                    Zmazať
                  </button>
                </div>
              ))}
            </>
          )
      )}
    </>
  )
}

export default Reviews
