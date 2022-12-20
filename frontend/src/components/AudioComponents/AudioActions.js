import React, { useContext } from 'react'
import playerContext from './context/playerContext'

// Component
let AudioActions = (subcategory) => {
  let { currentSong, songslist } = useContext(playerContext)
  songslist = songslist.filter((audio) => {
    return (
      audio.category === 'Slová života' &&
      audio.subcategory === subcategory.subcategory.subcategory
    )
  })

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
