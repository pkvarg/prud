import React from 'react'
import '../audioPlayerCss/main.css'
import '../audioPlayerCss/input.css'
import AudioHeader from './AudioComponents/AudioHeader'
import Controlls from './AudioComponents/controlls'
import AudioActions from './AudioComponents/AudioActions'
import Playlist from './AudioComponents/Playlist'
import PlayerState from './AudioComponents/context/playerState'

let AudioPlayer = () => {
  return (
    <PlayerState>
      <div className='audioplayer'>
        <div className='inside_content'>
          <AudioHeader />
          <AudioActions />
          <Playlist />
        </div>
        <Controlls />
      </div>
    </PlayerState>
  )
}

export default AudioPlayer
