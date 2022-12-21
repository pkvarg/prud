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
              <Form.Label>
                Názov (napr. Boh v liste Rimanom I., tak sa to zobrazí v mp3
                prehrávači )
              </Form.Label>
              <Form.Control
                type='text'
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
              <Form.Label>Kategória</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='category-dropdown'
                >
                  Kategória
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key='Slová života'
                    value='Slová života'
                    onClick={() => setCategory('Slová života')}
                  >
                    <h5 className='language-dropdown-lang'>Slová života</h5>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key='Štúdium života'
                    value='Štúdium života'
                    onClick={() => setCategory('Štúdium života')}
                  >
                    <h5 className='language-dropdown-lang'>Štúdium života</h5>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type='text'
                placeholder='Kategória'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {category !== 'Štúdium života' && (
              <Form.Group controlId='subcategory' className='my-3'>
                <Form.Label>Podkategória</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='success'
                    id='dropdown-basic'
                    className='category-dropdown'
                  >
                    Podkategória
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
                      key='Boží evangelium'
                      value='Boží evangelium'
                      onClick={() => setSubcategory('Boží evangelium')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Boží evangelium
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Charakter Pánovho pracovníka'
                      value='Charakter Pánovho pracovníka'
                      onClick={() =>
                        setSubcategory('Charakter Pánovho pracovníka')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Charakter Pánovho pracovníka
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Človek a dva stromy'
                      value='Človek a dva stromy'
                      onClick={() => setSubcategory('Človek a dva stromy')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Človek a dva stromy
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Hlavné Kristove kroky'
                      value='Hlavné Kristove kroky'
                      onClick={() => setSubcategory('Hlavné Kristove kroky')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Hlavné Kristove kroky
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Fakt víra a prožitek'
                      value='Fakt víra a prožitek'
                      onClick={() => setSubcategory('Fakt víra a prožitek')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Fakt víra a prožitek
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='KŘESŤANSKÝ ŽIVOT'
                      value='KŘESŤANSKÝ ŽIVOT'
                      onClick={() => setSubcategory('KŘESŤANSKÝ ŽIVOT')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        KŘESŤANSKÝ ŽIVOT
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
                      key='Kristus ako zľutovnica'
                      value='Kristus ako zľutovnica'
                      onClick={() => setSubcategory('Kristus ako zľutovnica')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Kristus ako zľutovnica{' '}
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Naplnenie starého zákona'
                      value='Naplnenie starého zákona'
                      onClick={() => setSubcategory('Naplnenie starého zákona')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Naplnenie starého zákona{' '}
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Nevystihnuteľné Kristovo bohatstvo'
                      value='Nevystihnuteľné Kristovo bohatstvo'
                      onClick={() =>
                        setSubcategory('Nevystihnuteľné Kristovo bohatstvo')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Nevystihnuteľné Kristovo bohatstvo
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='O človeku'
                      value='O človeku'
                      onClick={() => setSubcategory('O človeku')}
                    >
                      <h5 className='language-dropdown-lang'> O človeku</h5>
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
                      key='Porátať sa s hriechmi'
                      value='Porátať sa s hriechmi'
                      onClick={() => setSubcategory('Porátať sa s hriechmi')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Porátať sa s hriechmi
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Porátať sa so svetom'
                      value='Porátať sa so svetom'
                      onClick={() => setSubcategory('Porátať sa so svetom')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Porátať sa so svetom
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Poselství evangelia'
                      value='Poselství evangelia'
                      onClick={() => setSubcategory('Poselství evangelia')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Poselství evangelia
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Prožívání Krista'
                      value='Prožívání Krista'
                      onClick={() => setSubcategory('Prožívání Krista')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Prožívání Krista
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='ŘADA PRO NOVÉ VĚŘÍCÍ'
                      value='ŘADA PRO NOVÉ VĚŘÍCÍ'
                      onClick={() => setSubcategory('ŘADA PRO NOVÉ VĚŘÍCÍ')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        ŘADA PRO NOVÉ VĚŘÍCÍ
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
                      key='Skúsenosti veriacich s Kristovým vzkriesením'
                      value='Skúsenosti veriacich s Kristovým vzkriesením'
                      onClick={() =>
                        setSubcategory(
                          'Skúsenosti veriacich s Kristovým vzkriesením'
                        )
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Skúsenosti veriacich s Kristovým vzkriesením
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Skúsenosť života'
                      value='Skúsenosť života'
                      onClick={() => setSubcategory('Skúsenosť života')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Skúsenosť života
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
                      key='Štruktúra Božieho evanjelia'
                      value='Štruktúra Božieho evanjelia'
                      onClick={() =>
                        setSubcategory('Štruktúra Božieho evanjelia')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Štruktúra Božieho evanjelia
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
                      key='Trojnásobné semeno'
                      value='Trojnásobné semeno'
                      onClick={() => setSubcategory('Trojnásobné semeno')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Trojnásobné semeno
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Učenie apoštolov'
                      value='Učenie apoštolov'
                      onClick={() => setSubcategory('Učenie apoštolov')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Učenie apoštolov
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Udeľovanie života'
                      value='Udeľovanie života'
                      onClick={() => setSubcategory('Udeľovanie života')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Udeľovanie života
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='VĚČNÝ BOŽÍ PLÁN'
                      value='VĚČNÝ BOŽÍ PLÁN'
                      onClick={() => setSubcategory('VĚČNÝ BOŽÍ PLÁN')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        VĚČNÝ BOŽÍ PLÁN
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Vzoprieť sa satanovi'
                      value='Vzoprieť sa satanovi'
                      onClick={() => setSubcategory('Vzoprieť sa satanovi')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Vzoprieť sa satanovi
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='Zjevení života'
                      value='Zjevení života'
                      onClick={() => setSubcategory('Zjevení života')}
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        Zjevení života
                      </h5>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key='ZÁKLADNÍ PRVKY KŘESŤANSKÉHO ŽIVOTA'
                      value='ZÁKLADNÍ PRVKY KŘESŤANSKÉHO ŽIVOTA'
                      onClick={() =>
                        setSubcategory('ZÁKLADNÍ PRVKY KŘESŤANSKÉHO ŽIVOTA')
                      }
                    >
                      <h5 className='language-dropdown-lang'>
                        {' '}
                        ZÁKLADNÍ PRVKY KŘESŤANSKÉHO ŽIVOTA
                      </h5>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type='text'
                  placeholder='Podkategória'
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

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
