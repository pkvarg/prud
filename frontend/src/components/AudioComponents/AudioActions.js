import React, { useContext } from 'react'
import playerContext from './context/playerContext'

// Component
let AudioActions = () => {
  const { currentSong, songslist } = useContext(playerContext)

  return (
    <div className='actions'>
      <div className='album_meta'>
        <h1 className='album_meta_title'>SLOVÁ ŽIVOTA A PRAVDY</h1>
        <h3 className='album_meta_title'>
          {songslist[currentSong].audioTitle}
        </h3>
      </div>
    </div>
  )
}

export default AudioActions
