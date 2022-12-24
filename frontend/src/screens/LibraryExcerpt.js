import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { listProducts } from '../actions/productActions'

const LibraryExcerpt = () => {
  const params = useParams()
  const category = params.category
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  return (
    <>
      <Link className='btn btn-back my-3' onClick={() => navigate(-1)}>
        Naspäť
      </Link>
      <div className='my-3'>
        {products.map(
          (product) =>
            product.excerpt && (
              <Col key={product._id}>
                <>
                  <h1>{product.name}</h1>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.excerpt.image}
                      alt={product.name}
                      className='prod-img-excerpt-excerpt'
                    ></Image>
                  </Link>
                  <p className='prod-excerpt-excerpt'>
                    {product.excerpt.excerpt}
                  </p>
                </>
              </Col>
            )
        )}
        <button
          className='scroll-up'
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
        >
          <i class='fa fa-arrow-circle-up' aria-hidden='true'></i>
        </button>
      </div>
    </>
  )
}

export default LibraryExcerpt
