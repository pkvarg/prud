import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listBannerDetails, updateBanner } from '../actions/bannerActions'
import { BANNER_UPDATE_RESET } from '../constants/bannerConstants'

const BannerEditScreen = () => {
  const params = useParams()
  const bannerId = params.id
  const navigate = useNavigate()

  const [bannerTitle, setBannerTitle] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')

  const [uploading, setUploading] = useState(false)

  /* All Audios Dropdown content*/
  const bannerList = useSelector((state) => state.bannerList)
  const { banners } = bannerList

  const dispatch = useDispatch()

  const bannerDetails = useSelector((state) => state.bannerDetails)
  const { loading, error, banner } = bannerDetails

  const bannerUpdate = useSelector((state) => state.bannerUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bannerUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BANNER_UPDATE_RESET })
      navigate('/admin/banner')
    } else {
      if (!banner.bannerTitle || banner._id !== bannerId) {
        dispatch(listBannerDetails(bannerId))
      } else {
        setBannerTitle(banner.bannerTitle)
        setImage(banner.image)
        setCategory(banner.category)
      }
    }
  }, [dispatch, navigate, bannerId, banner, successUpdate, banners])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('upload', file)
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
      updateBanner({
        _id: bannerId,
        bannerTitle,
        image,
        category,
      })
    )
  }

  return (
    <>
      <Link to='/admin/banner' className='btn btn-back my-3'>
        Nasp????
      </Link>
      <FormContainer>
        <h1>Banner</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='banner-title'>
              <Form.Label>N??zov</Form.Label>
              <Form.Control
                type='text'
                placeholder='N??zov'
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='banner-file' className='mb-3'>
              <Form.Label>Banner</Form.Label>
              <Form.Control
                type='text'
                placeholder='Obr??zok'
                value={image}
                readOnly
                // onChange={(e) => setMp3file(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            {/* <Form.Group controlId='category'>
              <Form.Label>Kateg??ria</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='category-dropdown'
                >
                  Kateg??ria
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key='Slov?? ??ivota'
                    value='Slov?? ??ivota'
                    onClick={() => setCategory('Slov?? ??ivota')}
                  >
                    <h5 className='language-dropdown-lang'>Slov?? ??ivota</h5>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key='??t??dium ??ivota'
                    value='??t??dium ??ivota'
                    onClick={() => setCategory('??t??dium ??ivota')}
                  >
                    <h5 className='language-dropdown-lang'>??t??dium ??ivota</h5>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type='text'
                placeholder='Kateg??ria'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Button className='my-5 btn-blue' type='submit' variant='primary'>
              Ulo??i??
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default BannerEditScreen
