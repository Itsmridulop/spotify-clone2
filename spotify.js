let audio = new Audio('songs/1.mp3')
let index = 0
let innerPlay = Array.from(document.getElementsByClassName('fa-regular fa-circle-play'))
let progressBar = document.getElementById('progressbar')
let masterPlay = document.getElementById('masterPlay')
let downSongName = document.getElementById('songName')
let gif = document.getElementById('gif')
let timing = document.getElementById('timing')
let song_name = Array.from(document.getElementsByClassName('song_name'))
let song = Array.from(document.getElementsByClassName('songs'))

let songs = [
    {songName: 'Pal', filePath: new Audio('songs/1.mp3')},
    {songName: 'What Jhumka', filePath: new Audio('songs/2.mp3')},
    {songName: 'Anpa Bana Le', filePath: new Audio('songs/3.mp3')},
    {songName: 'Mannat', filePath: new Audio('songs/4.mp3')},
    {songName: 'Heeriye', filePath: new Audio('songs/5.mp3')},
    {songName: 'Blue Eyes', filePath: new Audio('songs/6.mp3')},
    {songName: 'Uska hi Bana', filePath: new Audio('songs/7.mp3')},
    {songName: 'Sarkaare', filePath: new Audio('songs/8.mp3')},
    {songName: 'Tum Saath rehnaa', filePath: new Audio('songs/9.mp3')},
    {songName: 'Mulaqat', filePath: new Audio('songs/10.mp3')}
    // {songName: ''}
]

song_name.forEach((element,i) => {
    element.innerHTML = songs[i].songName
})

const playManager = () => {
    innerPlay.forEach(element => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')  
    })
}

const NewPlay = (playItemId) => {
    audio.src = `songs/${playItemId}.mp3`
    audio.play()
    index = playItemId-1
    innerPlay[index].classList.remove('fa-play-circle')
    innerPlay[index].classList.add('fa-pause-circle')
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1
    downSongName.style.opacity = 1
}

const playAudio = () => {
    if(audio.paused){
        downSongName.innerHTML = songs[index].songName
        audio.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        innerPlay[index].classList.remove('fa-play-circle')
        innerPlay[index].classList.add('fa-pause-circle')
        downSongName.style.opacity = 1
        gif.style.opacity = 1
    }
    else{
        audio.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        innerPlay[index].classList.remove('fa-pause-circle')
        innerPlay[index].classList.add('fa-play-circle')
        downSongName.style.opacity = 0
        gif.style.opacity = 0
    }
}

const nextPlay = () => {
    if (index >= 9)
        index = 0
    else
        index++
    playManager();
    innerPlay[index].classList.remove('fa-play-circle')
    innerPlay[index].classList.add('fa-pause-circle')
    audio.src = `songs/${index+1}.mp3`
    audio.play()
    gif.style.opacity = 1
    downSongName.style.opacity = 1
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    downSongName.innerHTML = songs[index].songName
}

const prevPlay = () => {
    if(index <= 0)
        index = 9
    else
        index--
    playManager();
    innerPlay[index].classList.remove('fa-play-circle')
    innerPlay[index].classList.add('fa-pause-circle')
    audio.src = `songs/${index+1}.mp3`
    audio.play()
    gif.style.opacity = 1
    downSongName.style.opacity = 1
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    downSongName.innerHTML = songs[index].songName
}

const search_Bar = (val) => {
    song_name.forEach((element,i) => {
        if(event.code === 'Enter' && val != ''){
            if(element.innerHTML.toLowerCase() != val.toLowerCase()){
                element.style.display = 'none' 
                innerPlay[i].style.display = 'none'
                song[i].style.borderColor = 'transparent'
                song[i].style.margin = '0'
                Array.from(document.getElementsByClassName('coverImage'))[i].style.display = 'none'
                Array.from(document.getElementsByClassName('duration'))[i].style.display = 'none'
            }
        }
        else if(val == ''){
            element.style.display = 'inline' 
            innerPlay[i].style.display = 'inline'
            song[i].style.borderColor = 'transparent transparent #ffffff2e transparent'
            song[i].style.marginBottom = '1vw'
            Array.from(document.getElementsByClassName('coverImage'))[i].style.display = 'inline'
            Array.from(document.getElementsByClassName('duration'))[i].style.display = 'inline'
        }
    })
}

innerPlay.forEach((ele,i) => {
    ele.addEventListener('click', (e) => {
        downSongName.innerHTML = songs[i].songName
        playManager()
        if(audio.paused){
            audio.src = `songs/${index+1}.mp3`
            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            audio.play()
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            downSongName.style.opacity = 1
            gif.style.opacity = 1 
        }
        else{
            e.target.classList.remove('fa-pause-circle')
            e.target.classList.add('fa-play-circle')
            audio.pause()
            masterPlay.classList.remove('fa-pause-circle')
            masterPlay.classList.add('fa-play-circle')
            downSongName.style.opacity = 0
            gif.style.opacity = 0
            if(e.target.id != index)
                NewPlay(parseInt(e.target.id)+1)
        }
    })
})  

document.addEventListener('keydown', (e) => {
    if(e.target.id != 'searchBar'){
        e.preventDefault()
        if (event.code === 'Space')
            playAudio()
        if (event.code === 'ArrowRight')
            nextPlay()
        if (event.code === 'ArrowLeft')
            prevPlay()
    }
})

masterPlay.addEventListener('click', () => {
   playAudio()
})

audio.addEventListener('ended', () => {
    innerPlay[index].classList.remove('fa-pause-circle')
    innerPlay[index].classList.add('fa-play-circle')
    index++;
    audio.src = `songs/${index+1}.mp3`
    innerPlay[index].classList.remove('fa-play-circle')
    innerPlay[index].classList.add('fa-pause-circle')
    downSongName.innerHTML  = songs[index].songName
    audio.play()
})

audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime/audio.duration)*100
    var sec = parseInt(audio.currentTime)
    let min = sec/60
    timing.innerHTML = `${parseInt(min)}:${Math.round((min - Math.floor(min)) * 60)}`
})

progressBar.addEventListener('click', () => {
    audio.currentTime = (progressBar.value/100)*audio.duration
})

document.getElementById('previous').addEventListener('click', () => {
    prevPlay()
})

document.getElementById('next').addEventListener('click', () => {
    nextPlay()
})