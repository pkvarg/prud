import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  // useEffect(() => {
  //   dispatch(listTopProducts())
  // }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    // <Carousel pause='hover' className='carousel-custom'>
    //   {products.map((product) => (
    //     <Carousel.Item key={product._id}>
    //       <Link to={`/product/${product._id}`}>
    //         <Image src={product.image} alt={product.name} fluid />
    //         <Carousel.Caption className='carousel-caption'>
    //           <h2>
    //             {product.name} (${product.price})
    //           </h2>
    //         </Carousel.Caption>
    //       </Link>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
    <Carousel pause='hover' className='carousel-custom'>
      <Carousel.Item key='1'>
        <Link to={`/`}>
          <Image src='/images/slide-image-1.jpg' alt='prud-01' fluid />
          <Carousel.Caption className='carousel-caption'>
            <h2>DARUJTE 2% Z DANE</h2>
            <p>Tento rok sme sa stali prijímateľmi 2%.</p>
            <p>Za akúkoľvek vašu podporu sme vám </p>
            <p>už teraz vďační!</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item key='2'>
        <Image
          src='/images/slide-image-2.jpg'
          alt='prud-02'
          fluid
          className='slide-img-2'
        />
        <Carousel.Caption className='carousel-caption-2'>
          <h2>- 30 % NA VŠETKY KNIHY</h2>
          <p>Aj na: Genezis - 120 kapitol sledujúcich Božský život </p>
          <p>zakúšaný Božím ľudom v knihe Genezis od Adama</p>
          <p>po Jakuba s Jozefom.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item key='3'>
        <Image
          src='/images/slide-image-3.jpg'
          alt='prud-03'
          fluid
          className='slide-img-2'
        />
        <Carousel.Caption className='carousel-caption-3'>
          <h2>- 30 % NA VŠETKY KNIHY</h2>
          <p>Aj na: Knihy lekcií - Trojjediný Boh, Spása, Duch, </p>
          <p>Život a Cirkev - pre všetkých, ktorí si chcú</p>
          <p>rýchlo osvojiť Biblické pravdy.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default ProductCarousel
