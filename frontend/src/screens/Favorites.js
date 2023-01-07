import React, { useEffect } from 'react'
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
  const { products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts('', pageNumber, pageSize))
  }, [dispatch, userInfo, navigate, pageNumber])

  // let favoriteProducts = []
  // products.map((prod) => {
  //   return prod.favoriteOf.map(
  //     (fav) => fav._id === userInfo._id && favoriteProducts.push(prod)
  //   )
  // })

  // unique Set

  let favoriteProductsSet = new Set()
  products.map((prod) => {
    return prod.favoriteOf.map(
      (fav) => fav._id === userInfo._id && favoriteProductsSet.add(prod)
    )
  })

  // back to Array
  let favoriteProducts = Array.from(favoriteProductsSet)

  // const removeFromFavoritesHandler = (productId) => {
  //   dispatch(updateProduct({ _id: productId, favoriteOf: userId }))
  //   document.location.href = `/favorites`
  // }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <>
      <Row className='align-items-center no-mobile'>
        <Col>
          <h1>Moje obľúbené produkty</h1>
          <div className='prods-by-year-container' key='000'>
            {favoriteProducts.map((product) => (
              <div className='prods-by-year' key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className='prod-img-year-width'
                  ></Image>
                </Link>
                <h1>{product.name}</h1>
                <h4>€{addDecimals(product.price)}</h4>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      {/* <Row className='align-items-center mobile-only'>
        <Col>
          <h1>Moje obľúbené produkty</h1>
        </Col>
      </Row> */}
    </>
  )
}

export default Favorites
