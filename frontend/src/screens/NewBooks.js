import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Image } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import { listAllProducts } from '../actions/productActions'

const NewBooks = () => {
  const params = useParams()
  const year = params.year
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProductDetails(year))
  }, [dispatch, year])

  const productList = useSelector((state) => state.productList)
  const { products } = productList
  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch])

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>
      <div>
        <h1>Knihy {year}</h1>
        <div className='prods-by-year-container'>
          {products.map((product) => (
            <div className='prods-by-year'>
              <Col key={product._id}>
                {product.year === year && (
                  <div className='prod-by-year'>
                    <h1>{product.name}</h1>
                    <h4>Jazyk: {product.language}</h4>
                    <h4>{product.binding}</h4>
                    <h4>{product.pages} strán</h4>
                    <h4>{product.isbn}</h4>
                    {product.language === 'SK' ? (
                      <Image
                        src='/images/flag_sk40px_0.png'
                        alt={product.name}
                        fluid
                      ></Image>
                    ) : (
                      <Image
                        src='/images/flag_cz40px_2_27.png'
                        alt={product.name}
                        fluid
                      ></Image>
                    )}
                  </div>
                )}
              </Col>
              <Col key={product._id}>
                {product.year === year && (
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className='prod-img-year-width'
                    ></Image>
                  </Link>
                )}
              </Col>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NewBooks
