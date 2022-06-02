class MusicPlayer{
  constructor(){
    self.musicList = ["music/hedwig.mp3","music/inferi.mp3","music/courtyard-apocalypse.mp3","music/showdown.mp3","music/voldemort-end.mp3","music/obliviate.mp3","music/hp-theme.mp3", "music/fb-theme.mp3"]
    self.volume = 0.5
    self.cpt = 0
    self.audioElement = document.getElementById("audio")
  }

  next(){
    self.stop()
    self.cpt = (self.cpt+1)%self.musicList.length
    self.audioElement.setAttribute('src', musicList[self.cpt])
    self.audioElement.play()
  }

  previous(){
    self.stop()
    self.cpt = ((self.cpt-1) + self.musicList.length)%self.musicList.length
    self.audioElement.setAttribute('src', musicList[self.cpt])
    self.audioElement.play()
  }


  play(){
    self.audioElement.setAttribute('src', musicList[0])
    self.audioElement.volume = self.volume
    
    self.audioElement.addEventListener('ended', function() {
        self.cpt = (self.cpt+1)%musicList.length
        audioElement.setAttribute('src', self.musicList[self.cpt])
        this.play()
    }, false)

    self.audioElement.play()
  }

  stop(){
    self.audioElement.pause()
    self.audioElement.currentTime = 0
  }
}

player = new MusicPlayer()
function handleNext(){
  player.next()
}

function handlePrevious(){
  player.previous()
}

function handleMainButton(){
  var textPause = "Pause the music"
  var textPlay = "Play the music"
  var btnPlay = $('#playMusic')

  var txt = btnPlay.text() 
  if(txt === textPlay){
    player.play()
    btnPlay.text(textPause)
  }else{
    player.stop()
    btnPlay.text(textPlay)
  }
}
