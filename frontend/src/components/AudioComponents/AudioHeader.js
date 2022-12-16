import React, { useContext } from 'react'
import playerContext from './context/playerContext'

let AudioHeader = () => {
  const { currentSong, songslist } = useContext(playerContext)
  return (
    <header>
      <h3 className='audio-header'>{songslist[currentSong].title}</h3>
    </header>
  )
}

export default AudioHeader
