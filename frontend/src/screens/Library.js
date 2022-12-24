import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { listProducts } from '../actions/productActions'

const Library = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { products } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  // sort by abc
  products.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  console.log(products)

  return (
    <div className='my-3'>
      <h1>Čitáreň</h1>
      {products.map(
        (product) =>
          product.excerpt && (
            <Col key={product._id} className='mb-5'>
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
  )
}

export default Library
