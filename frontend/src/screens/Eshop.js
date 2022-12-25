import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'

const Eshop = () => {
  const params = useParams()
  const category = params.category
  const dispatch = useDispatch()

  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  // sort by abc
  if (category === 'abecedný-zoznam-kníh') {
    products.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  return (
    <>
      <div className='eshop-row-mobile'>
        <h1 className='new-publications'>Eshop</h1>
        <h4 className='eshop-category'>
          {category.replace('-', ' ').replace('-', ' ').replace('-', ' ')}
        </h4>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='eshop-row-mobile'>
            {category !== 'abecedný-zoznam-kníh'
              ? products.map(
                  (product) =>
                    product.category === category && (
                      <>
                        <Col
                          className='
            align-items-stretch d-flex no-mobile
            '
                          key={product._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={product} />
                        </Col>

                        <Col
                          className='
                      align-items-stretch mobile-only
                      '
                          key={product._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={product} />
                        </Col>
                      </>
                    )
                )
              : products.map((product) => (
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <p className='eshop-mobile-link' key={product._id}>
                      {product.name}
                    </p>
                  </Link>
                ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default Eshop
