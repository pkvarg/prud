import React, { useContext } from 'react'
import playerContext from '../../components/AudioComponents/context/playerContext'

let Playlist = (subcategory) => {
  let { songslist, currentSong, SetCurrent } = useContext(playerContext)
  songslist = songslist.filter((audio) => {
    return (
      audio.category === 'Slová života' &&
      audio.subcategory === subcategory.subcategory.subcategory
    )
  })

  return (
    <>
      <div className='playlist no_drag'>
        <div className='playlist-subcategory'>
          <h3>{subcategory.subcategory.subcategory}</h3>
        </div>
        <ul className='loi'>
          {songslist.map((song, i) => (
            <li
              className={
                'songContainer ' + (currentSong === i ? 'selected' : '')
              }
              key={i}
              onClick={() => SetCurrent(i)}
            >
              <div className='tmbn_song'>
                <i className='fas fa-play'></i>
              </div>
              <div className='songmeta_playlist'>
                <span className='songname'>{song.audioTitle}</span>
              </div>
              <div className='playlist_btns_group'></div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Playlist
