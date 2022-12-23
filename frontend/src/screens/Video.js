import React from 'react'
import YoutubeEmbed from './../components/YouTubeEmbed'
import { links } from './../youtubeLinks/youtubeLinks'

const Video = () => {
  // sort by abc
  links.sort((a, b) => {
    return a.videoTitle.localeCompare(b.videoTitle)
  })
  return (
    <>
      <div className='my-3'>
        <h1>Video</h1>
        {links.map((link) => (
          <YoutubeEmbed key={link._id} embedId={link.code} />
        ))}
        {/* <YoutubeEmbed embedId='K0g8dn_RjdY' />
        <YoutubeEmbed embedId='1KG0v8gmskY' />
        <YoutubeEmbed embedId={code} /> */}
      </div>
    </>
  )
}

export default Video
