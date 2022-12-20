import React from 'react'
import '../../src/audio.css'
import PlayerState from './AudioComponents/context/playerState'
import Controls2 from './AudioComponents/Controls2'
import Playlist2 from './AudioComponents/Playlist2'
import AudioActions2 from './AudioComponents/AudioActions2'

let AudioPlayer2 = () => {
  return (
    <PlayerState>
      <div className='audioplayer'>
        <div className='inside_content'>
          <AudioActions2 />
          <Playlist2 />
        </div>
        <Controls2 />
      </div>
    </PlayerState>
  )
}

export default AudioPlayer2
