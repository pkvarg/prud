import React from 'react'
import '../../src/audio.css'
import Controls from './AudioComponents/Controls'
import AudioActions from './AudioComponents/AudioActions'
import Playlist from './AudioComponents/Playlist'
import PlayerState from './AudioComponents/context/playerState'

let AudioPlayer = () => {
  return (
    <PlayerState>
      <div className='audioplayer'>
        <div className='inside_content'>
          <AudioActions />
          <Playlist />
        </div>
        <Controls />
      </div>
    </PlayerState>
  )
}

export default AudioPlayer
