import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { listProducts } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
import Product from '../components/Product'
// import PaginateLibrary from '../components/Paginate'

const Favorites = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const pageSize = 80
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts('', pageNumber, pageSize))
  }, [dispatch, userInfo, navigate, pageNumber])

  let favoriteProducts = []

  // unique Set

  let favoriteProductsSet = new Set()
  if (userInfo) {
    products.map((prod) => {
      return prod.favoriteOf.map(
        (fav) => fav._id === userInfo._id && favoriteProductsSet.add(prod)
      )
    })

    // back to Array
    favoriteProducts = Array.from(favoriteProductsSet)
  }

  // Remove from Favs !!!

  // const removeFromFavoritesHandler = (productId) => {
  //   dispatch(updateProduct({ _id: productId, favoriteOf: userId }))
  //   document.location.href = `/favorites`
  // }

  return (
    <>
      <h1>Moje obľúbené produkty</h1>
      <Row>
        <>
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
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
            ))
          ) : (
            <h3>Nemáte žiadne oblúbené produkty</h3>
          )}
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
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
            ))
          ) : (
            <h3 className='mobile-only'>Nemáte žiadne oblúbené produkty</h3>
          )}
        </>
      </Row>
      {/* <PaginateLibrary
        pages={pages}
        page={page}
        keyword={'library'}
      ></PaginateLibrary> */}
    </>
  )
}

export default Favorites
