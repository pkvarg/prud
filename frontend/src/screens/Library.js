import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { listProducts } from '../actions/productActions'

const Library = () => {
  const params = useParams()
  const category = params.category
  const dispatch = useDispatch()

  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { products } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  // sort by abc
  if (category === 'abecedný-zoznam-kníh') {
    products.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  console.log(products)

  return (
    <div className='my-3'>
      <h1>Čitáreň</h1>
      {products.map(
        (product) =>
          product.excerpt && (
            <Col key={product._id}>
              <>
                <h2>{product.name}</h2>
                <Link to={`/product/${product._id}`}>
                  <Image
                    src={product.excerpt.image}
                    alt={product.name}
                    className='prod-img-excerpt-part'
                  ></Image>
                </Link>
                <p className='prod-excerpt-part'>{product.excerpt.part}</p>
                <Link
                  to={`/library/${product._id}`}
                  className='library-more-link'
                >
                  Čítať viac
                </Link>
              </>
            </Col>
          )
      )}
    </div>
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : error ? (
    //     <Message variant='danger'>{error}</Message>
    //   ) : (
    //     <>
    //       <Row className='eshop-row-mobile'>
    //         {category !== 'abecedný-zoznam-kníh'
    //           ? products.map(
    //               (product) =>
    //                 product.category === category && (
    //                   <>
    //                     <Col
    //                       className='
    //         align-items-stretch d-flex no-mobile
    //         '
    //                       key={product._id}
    //                       sm={12}
    //                       md={6}
    //                       lg={4}
    //                       xl={3}
    //                     >
    //                       <Product product={product} />
    //                     </Col>

    //                     <Col
    //                       className='
    //                   align-items-stretch mobile-only
    //                   '
    //                       key={product._id}
    //                       sm={12}
    //                       md={6}
    //                       lg={4}
    //                       xl={3}
    //                     >
    //                       <Product product={product} />
    //                     </Col>
    //                   </>
    //                 )
    //             )
    //           : products.map((product) => (
    //               <Link to={`/product/${product._id}`}>
    //                 <p className='eshop-mobile-link' key={product._id}>
    //                   {product.name}
    //                 </p>
    //               </Link>
    //             ))}
    //       </Row>
    //       <Paginate
    //         pages={pages}
    //         page={page}
    //         keyword={keyword ? keyword : ''}
    //       ></Paginate>
    //     </>
    //   )}
    // </>
  )
}

export default Library
