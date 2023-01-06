import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {
  listProducts,
  acknowledgeProductReview,
  deleteProductReview,
  updateProduct,
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

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

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

  const deleteHandler = (product, comment) => {
    if (window.confirm('Odstrániť recenziu? Ste si istý?')) {
      dispatch(deleteProductReview(product, comment))
      document.location.href = `/admin/reviews`
    }
  }

  const acknowledgeHandler = (productId, comment) => {
    dispatch(acknowledgeProductReview(productId, comment))
    document.location.href = `/admin/reviews`
    alert('Recenzia schválená')
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
          product.reviews.length > 0 && (
            <>
              <h2 key={product._id} className='manage-single-review-title'>
                Titul: {product.name}
              </h2>

              {product.reviews.map((review) => (
                <div
                  className={
                    review.isAcknowledged
                      ? 'manage-single-review green'
                      : 'manage-single-review red'
                  }
                >
                  <div key='0' className='manage-single-review-comment'>
                    "{review.comment}" napísal {review.name}
                  </div>
                  <p key='2'>{review.createdAt.substring(0, 10)}</p>
                  <p key='3'>
                    {review.isAcknowledged ? 'Schválená' : 'Neschválená'}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className='manage-single-review-link'
                  >
                    Na produkt
                  </Link>
                  <button
                    key='4'
                    className='btn-blue reviews'
                    onClick={() =>
                      acknowledgeHandler(product._id, review.comment)
                    }
                  >
                    Schváliť recenziu
                  </button>
                  <button
                    key='5'
                    className='btn-red reviews'
                    onClick={() => deleteHandler(product, review.comment)}
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
