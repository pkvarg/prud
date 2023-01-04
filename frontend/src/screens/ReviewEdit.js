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

const ReviewEdit = () => {
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

  // useEffect(() => {
  //   dispatch({ type: PRODUCT_CREATE_RESET })
  //   if (!userInfo.isAdmin) {
  //     navigate('/login')
  //   }
  //   if (successCreate) {
  //     navigate(`/admin/product/${createdProduct._id}/edit`)
  //   } else {
  //     dispatch(listProducts('', pageNumber))
  //   }
  // }, [
  //   dispatch,
  //   userInfo,
  //   navigate,
  //   successDelete,
  //   successCreate,
  //   createdProduct,
  //   pageNumber,
  // ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = (product) => {
    dispatch(createProduct())
  }

  const linkToCreateDiscount = () => {
    navigate('/create-discount')
  }

  // by abc
  // products.sort((a, b) => {
  //   return a.name.localeCompare(b.name)
  // })

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

  return <></>
}

export default ReviewEdit
