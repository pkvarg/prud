import React, { useContext } from 'react'
import playerContext from '../../components/AudioComponents/context/playerContext'

let Playlist2 = () => {
  let { songslist, currentSong, SetCurrent } = useContext(playerContext)

  songslist = songslist.filter((audio) => {
    return audio.category === 'Štúdium života'
  })

  return (
    <div className='playlist no_drag'>
      <ul className='loi'>
        {songslist.map((song, i) => (
          <li
            className={'songContainer ' + (currentSong === i ? 'selected' : '')}
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
  )
}

export default Playlist2
