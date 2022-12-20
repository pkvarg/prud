import React, { useContext } from 'react'
import playerContext from './context/playerContext'

// Component
let AudioActions2 = () => {
  let { currentSong, songslist } = useContext(playerContext)

  songslist = songslist.filter((audio) => {
    return audio.category === 'Štúdium života'
  })

  return (
    <div className='actions'>
      <div className='album_meta'>
        <h1 className='album_meta_title'>ŠTÚDIUM ŽIVOTA</h1>
        <h3 className='album_meta_title'>
          {songslist[currentSong].audioTitle}
        </h3>
      </div>
    </div>
  )
}

export default AudioActions2
