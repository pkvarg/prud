import axios from 'axios'

export let wordsOflife = []
export let lifeStudy = []
export const myList = async () => {
  const { data } = await axios.get(`/api/audio`)
  // Words of life
  const audios = data.audios
  audios.map((audio) => {
    // if (audio.category === 'Slová života') {
    //   return wordsOflife.push(audio)
    // } else {
    //   return lifeStudy.push(audio)
    // }
    return wordsOflife.push(audio)
  })
}

myList()

// export const song_list = [
//   {
//     title: 'This is the title',
//     artistName: 'This is the artist name',
//     albumTitle: 'PROÍVÁNÍ KRISTA JAKO IVOTA',
//     fileUrl: num01,
//   },
//   {
//     title: 'This is the title2',
//     artistName: 'This is the artist name',
//     albumTitle: 'PROÍVÁNÍ KRISTA JAKO IVOTA',
//     fileUrl: num02,
//   },
//   {
//     title: 'Promenade Allegro giusto ',
//     artistName: 'Skidmore College Orchestra',
//     albumTitle: "Mussorgsky's Pictures at an Exhibition",
//     fileUrl:
//       'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_01_-_Promenade_Allegro_giusto_nel_modo_russico_senza_allegrezza_ma.mp3',
//   },
//   {
//     title: 'This should stream from Anchor.fm',
//     artistName: 'This is the artist name',
//     albumTitle: 'PROÍVÁNÍ KRISTA JAKO IVOTA',
//     fileUrl:
//       'https://anchor.fm/prudsk/episodes/Bible--Poselstv-evangelia-1-eraoeo',
//   },
// ]
