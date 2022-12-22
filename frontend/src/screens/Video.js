import React from 'react'
import YoutubeEmbed from './../components/YouTubeEmbed'

const Video = () => {
  return (
    <>
      <div className='my-3'>
        <h1>Video</h1>
        <YoutubeEmbed embedId='K0g8dn_RjdY' />
        <YoutubeEmbed embedId='1KG0v8gmskY' />
      </div>
    </>
  )
}

export default Video
