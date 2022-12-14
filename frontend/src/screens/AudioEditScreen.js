import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Dropdown } from 'react-bootstrap'
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
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')

  const [uploading, setUploading] = useState(false)

  /* All Audios Dropdown content*/
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

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AUDIO_UPDATE_RESET })
      navigate('/admin/audio')
    } else {
      if (!audio.audioTitle || audio._id !== audioId) {
        dispatch(listAudioDetails(audioId))
      } else {
        setAudioTitle(audio.audioTitle)
        setMp3file(audio.mp3file)
        setCategory(audio.category)
        setSubcategory(audio.subcategory)
      }
    }
  }, [dispatch, navigate, audioId, audio, successUpdate, audios])

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
        category,
        subcategory,
      })
    )
  }

  return (
    <>
      <Link to='/admin/audio' className='btn btn-back my-3'>
        Nasp????
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
              <Form.Label>
                N??zov (napr. Boh v liste Rimanom I., tak sa to zobraz?? v mp3
                prehr??va??i )
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='N??zov'
                value={audioTitle}
                onChange={(e) => setAudioTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='audio-file' className='mb-3'>
              <Form.Label>Mp3 s??bor</Form.Label>
              <Form.Control
                type='text'
                placeholder='Mp3 s??bor'
                value={mp3file}
                readOnly
                // onChange={(e) => setMp3file(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='category'>
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
            </Form.Group>

            {category !== '??t??dium ??ivota' && (
              <Form.Group controlId='subcategory' className='my-3'>
                <Form.Label>Podkateg??ria</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='success'
                    id='dropdown-basic'
                    className='category-dropdown'
                  >
                    Podkateg??ria
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      key='Boh v liste Rimanom'
                      value='Boh v liste Rimanom'
                      onClick={() => setSubcategory('Boh v liste Rimanom')}
                    >
                      <h5 className='language-dropdown-lang'>
                        Boh v liste Rimanom
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Bo???? evangelium'
                      value='Bo???? evangelium'
                      onClick={() => setSubcategory('Bo???? evangelium')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Bo???? evangelium
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Charakter P??novho pracovn??ka'
                      value='Charakter P??novho pracovn??ka'
                      onClick={() =>
                        setSubcategory('Charakter P??novho pracovn??ka')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Charakter P??novho pracovn??ka
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='??lovek a dva stromy'
                      value='??lovek a dva stromy'
                      onClick={() => setSubcategory('??lovek a dva stromy')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        ??lovek a dva stromy
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Hlavn?? Kristove kroky'
                      value='Hlavn?? Kristove kroky'
                      onClick={() => setSubcategory('Hlavn?? Kristove kroky')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Hlavn?? Kristove kroky
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Fakt v??ra a pro??itek'
                      value='Fakt v??ra a pro??itek'
                      onClick={() => setSubcategory('Fakt v??ra a pro??itek')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Fakt v??ra a pro??itek
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='K??ES??ANSK?? ??IVOT'
                      value='K??ES??ANSK?? ??IVOT'
                      onClick={() => setSubcategory('K??ES??ANSK?? ??IVOT')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        K??ES??ANSK?? ??IVOT
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Kristovo vzkriesenie'
                      value='Kristovo vzkriesenie'
                      onClick={() => setSubcategory('Kristovo vzkriesenie')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Kristovo vzkriesenie
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Kristus ako z??utovnica'
                      value='Kristus ako z??utovnica'
                      onClick={() => setSubcategory('Kristus ako z??utovnica')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Kristus ako z??utovnica{' '}
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Naplnenie star??ho z??kona'
                      value='Naplnenie star??ho z??kona'
                      onClick={() => setSubcategory('Naplnenie star??ho z??kona')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Naplnenie star??ho z??kona{' '}
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Nevystihnute??n?? Kristovo bohatstvo'
                      value='Nevystihnute??n?? Kristovo bohatstvo'
                      onClick={() =>
                        setSubcategory('Nevystihnute??n?? Kristovo bohatstvo')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Nevystihnute??n?? Kristovo bohatstvo
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='O ??loveku'
                      value='O ??loveku'
                      onClick={() => setSubcategory('O ??loveku')}
                    >
                      <h5 className='language-dropdown-lang'> O ??loveku</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='O Duchu'
                      value='O Duchu'
                      onClick={() => setSubcategory('O Duchu')}
                    >
                      <h5 className='language-dropdown-lang'> O Duchu</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='O Kristovi'
                      value='O Kristovi'
                      onClick={() => setSubcategory('O Kristovi')}
                    >
                      <h5 className='language-dropdown-lang'> O Kristovi</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Por??ta?? sa s hriechmi'
                      value='Por??ta?? sa s hriechmi'
                      onClick={() => setSubcategory('Por??ta?? sa s hriechmi')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Por??ta?? sa s hriechmi
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Por??ta?? sa so svetom'
                      value='Por??ta?? sa so svetom'
                      onClick={() => setSubcategory('Por??ta?? sa so svetom')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Por??ta?? sa so svetom
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Poselstv?? evangelia'
                      value='Poselstv?? evangelia'
                      onClick={() => setSubcategory('Poselstv?? evangelia')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Poselstv?? evangelia
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Pro????v??n?? Krista'
                      value='Pro????v??n?? Krista'
                      onClick={() => setSubcategory('Pro????v??n?? Krista')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Pro????v??n?? Krista
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='??ADA PRO NOV?? V??????C??'
                      value='??ADA PRO NOV?? V??????C??'
                      onClick={() => setSubcategory('??ADA PRO NOV?? V??????C??')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        ??ADA PRO NOV?? V??????C??
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Rok milosti'
                      value='Rok milosti'
                      onClick={() => setSubcategory('Rok milosti')}
                    >
                      <h5 className='language-dropdown-lang'> Rok milosti</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Sk??senosti veriacich s Kristov??m vzkriesen??m'
                      value='Sk??senosti veriacich s Kristov??m vzkriesen??m'
                      onClick={() =>
                        setSubcategory(
                          'Sk??senosti veriacich s Kristov??m vzkriesen??m'
                        )
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Sk??senosti veriacich s Kristov??m vzkriesen??m
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Sk??senos?? ??ivota'
                      value='Sk??senos?? ??ivota'
                      onClick={() => setSubcategory('Sk??senos?? ??ivota')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Sk??senos?? ??ivota
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Spasenie'
                      value='Spasenie'
                      onClick={() => setSubcategory('Spasenie')}
                    >
                      <h5 className='language-dropdown-lang'> Spasenie</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='??trukt??ra Bo??ieho evanjelia'
                      value='??trukt??ra Bo??ieho evanjelia'
                      onClick={() =>
                        setSubcategory('??trukt??ra Bo??ieho evanjelia')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        ??trukt??ra Bo??ieho evanjelia
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Svedomie'
                      value='Svedomie'
                      onClick={() => setSubcategory('Svedomie')}
                    >
                      <h5 className='language-dropdown-lang'> Svedomie</h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Trojn??sobn?? semeno'
                      value='Trojn??sobn?? semeno'
                      onClick={() => setSubcategory('Trojn??sobn?? semeno')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Trojn??sobn?? semeno
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='U??enie apo??tolov'
                      value='U??enie apo??tolov'
                      onClick={() => setSubcategory('U??enie apo??tolov')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        U??enie apo??tolov
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Ude??ovanie ??ivota'
                      value='Ude??ovanie ??ivota'
                      onClick={() => setSubcategory('Ude??ovanie ??ivota')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Ude??ovanie ??ivota
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='V????N?? BO???? PL??N'
                      value='V????N?? BO???? PL??N'
                      onClick={() => setSubcategory('V????N?? BO???? PL??N')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        V????N?? BO???? PL??N
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Vzoprie?? sa satanovi'
                      value='Vzoprie?? sa satanovi'
                      onClick={() => setSubcategory('Vzoprie?? sa satanovi')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Vzoprie?? sa satanovi
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Zjeven?? ??ivota'
                      value='Zjeven?? ??ivota'
                      onClick={() => setSubcategory('Zjeven?? ??ivota')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Zjeven?? ??ivota
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Z??KLADN?? PRVKY K??ES??ANSK??HO ??IVOTA'
                      value='Z??KLADN?? PRVKY K??ES??ANSK??HO ??IVOTA'
                      onClick={() =>
                        setSubcategory('Z??KLADN?? PRVKY K??ES??ANSK??HO ??IVOTA')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Z??KLADN?? PRVKY K??ES??ANSK??HO ??IVOTA
                      </h5>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type='text'
                  placeholder='Podkateg??ria'
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            <Button className='my-5 btn-blue' type='submit' variant='primary'>
              Ulo??i??
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AudioEditScreen
