import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FC'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
  const params = useParams()
  const productId = params.id
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [catalog, setCatalog] = useState('')
  const [weight, setWeight] = useState('')
  const [related, setRelated] = useState('')
  const [tags, setTags] = useState('')
  const [language, setLanguage] = useState('')
  const [binding, setBinding] = useState('')
  const [pages, setPages] = useState('')
  const [flag, setFlag] = useState('')
  const [isbn, setIsbn] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setAuthor(product.author)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setCatalog(product.catalog)
        setWeight(product.weight)
        setRelated(product.related)
        setTags(product.tags)
        setLanguage(product.language)
        setBinding(product.binding)
        setPages(product.pages)
        setFlag(product.flag)
        setIsbn(product.isbn)
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        author,
        category,
        description,
        countInStock,
        catalog,
        weight,
        related,
        tags,
        language,
        binding,
        pages,
        flag,
        isbn,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-back my-3'>
        Naspäť
      </Link>
      <FormContainer>
        <h1>Upraviť produkt</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='product-name'>
              <Form.Label>Meno</Form.Label>
              <Form.Control
                type='name'
                placeholder='Meno'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Cena</Form.Label>
              <Form.Control
                type='number'
                placeholder='Cena'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='mb-3'>
              <Form.Label>Obrázok</Form.Label>
              <Form.Control
                type='text'
                placeholder='Obrázok'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='author'>
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type='text'
                placeholder='Autor'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Počet na sklade</Form.Label>
              <Form.Control
                type='number'
                placeholder='Počet na sklade'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Kategória</Form.Label>
              <Form.Control
                type='text'
                placeholder='Kategória'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='catalog'>
              <Form.Label>Katalóg</Form.Label>
              <Form.Control
                type='text'
                placeholder='Katalóg'
                value={catalog}
                onChange={(e) => setCatalog(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='weight'>
              <Form.Label>Hmotnosť</Form.Label>
              <Form.Control
                type='text'
                placeholder='Hmotnosť'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='related'>
              <Form.Label>Pozrite si tiež</Form.Label>
              <Form.Control
                type='text'
                placeholder='Tituly...'
                value={related}
                onChange={(e) => setRelated(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='tags'>
              <Form.Label>Tagy</Form.Label>
              <Form.Control
                type='text'
                placeholder='Tagy'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='language'>
              <Form.Label>Jazyk</Form.Label>
              <Form.Control
                type='text'
                placeholder='Jazyk'
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='binding'>
              <Form.Label>Väzba</Form.Label>
              <Form.Control
                type='text'
                placeholder='Väzba'
                value={binding}
                onChange={(e) => setBinding(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='pages'>
              <Form.Label>Počet strán</Form.Label>
              <Form.Control
                type='text'
                placeholder='Počet strán'
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='flag'>
              <Form.Label>Vlajka</Form.Label>
              <Form.Control
                type='text'
                placeholder='Vlajka'
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isbn'>
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type='text'
                placeholder='ISBN'
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Popis</Form.Label>
              <Form.Control
                as='textarea'
                rows={15}
                type='textarea'
                placeholder='Popis'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='my-5 btn-blue' type='submit' variant='primary'>
              Uložiť
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
