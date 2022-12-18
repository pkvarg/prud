import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listAudioDetails, updateAudio } from '../actions/audioActions'
import { AUDIO_UPDATE_RESET } from '../constants/audioConstants'

const AudioEditScreen = () => {
  const params = useParams()
  const audioId = params.id
  const navigate = useNavigate()

  const [audioTitle, setAudioTitle] = useState('')
  const [mp3file, setMp3file] = useState('')
  const [year, setYear] = useState('')
  const [uploading, setUploading] = useState(false)

  // const [author, setAuthor] = useState('')
  // const [category, setCategory] = useState('')
  // const [description, setDescription] = useState('')
  // const [language, setLanguage] = useState('')

  /* All Products Dropdown content*/
  const audioList = useSelector((state) => state.audioList)
  const { audios } = audioList

  const dispatch = useDispatch()

  const audioDetails = useSelector((state) => state.audioDetails)
  const { loading, error, audio } = audioDetails

  const audioUpdate = useSelector((state) => state.audioUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = audioUpdate

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: AUDIO_UPDATE_RESET })
  //     navigate('/admin/audiolist')
  //   } else {
  //     if (!audio.audioTitle || audio._id !== audioId) {
  //       dispatch(listAudioDetails(audioId))
  //     } else {
  //       setAudioTitle(audio.audioTitle)
  //       setMp3file(audio.mp3file)
  //       setYear(audio.year)
  //     }
  //   }
  // }, [dispatch, navigate, audioId, audio, successUpdate, audios])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('mp3', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setMp3file(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateAudio({
        _id: audioId,
        audioTitle,
        mp3file,
        year,
        // author,
        // category,
        // description,
        // language,
      })
    )
  }

  return (
    <>
      <Link to='/admin/audio' className='btn btn-back my-3'>
        Naspäť
      </Link>
      <FormContainer>
        <h1>Audio</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='audio-title'>
              <Form.Label>Názov</Form.Label>
              <Form.Control
                type='name'
                placeholder='Názov'
                value={audioTitle}
                onChange={(e) => setAudioTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='audio-file' className='mb-3'>
              <Form.Label>Mp3 súbor</Form.Label>
              <Form.Control
                type='text'
                placeholder='Mp3 súbor'
                value={mp3file}
                onChange={(e) => setMp3file(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='year'>
              <Form.Label>Rok vydania</Form.Label>
              <Form.Control
                type='text'
                placeholder='Rok vydania'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='author'>
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type='text'
                placeholder='Autor'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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

            <Form.Group controlId='language'>
              <Form.Label>Jazyk</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='language-dropdown'
                >
                  Jazyk
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key='SK'
                    value='SK'
                    onClick={() => setLanguage('SK')}
                  >
                    <h5 className='language-dropdown-lang'>SK</h5>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key='CZ'
                    value='CZ'
                    onClick={() => setLanguage('CZ')}
                  >
                    <h5 className='language-dropdown-lang'>CZ</h5>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type='text'
                placeholder='Jazyk'
                value={language}
                readOnly
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
            </Form.Group> */}

            <Button className='my-5 btn-blue' type='submit' variant='primary'>
              Uložiť
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AudioEditScreen
