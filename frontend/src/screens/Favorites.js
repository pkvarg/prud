import React, { useEffect, useState } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { listProducts } from '../actions/productActions'
import { useNavigate, Link } from 'react-router-dom'

const Favorites = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const pageSize = 200
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const favorites = userInfo.favorites

  useEffect(() => {
    dispatch(listProducts('', pageNumber, pageSize))
  }, [dispatch, userInfo, navigate, pageNumber])

  let favoriteProducts = []
  products.map((prod) => {
    favorites.map((fav) => {
      if (prod._id === fav._id) return favoriteProducts.push(prod)
    })
  })

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <>
      <Row className='align-items-center no-mobile'>
        <Col>
          <h1>Moje obľúbené produkty</h1>
          <div className='prods-by-year-container'>
            {favoriteProducts.map((product) => (
              <div className='prods-by-year'>
                <>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className='prod-img-year-width'
                    ></Image>
                  </Link>
                  <h1>{product.name}</h1>
                  <h4>€{addDecimals(product.price)}</h4>
                </>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className='align-items-center mobile-only'>
        <Col>
          <h1>Moje obľúbené produkty</h1>
        </Col>
      </Row>
    </>
  )
}

export default Favorites
