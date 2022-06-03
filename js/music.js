var btnPlay = $("#audioCtrl")
var textPause = "Pause the music"
var textPlay = "Play the music"

class MusicPlayer{
  constructor(){
    self.musicList = ["music/hedwig.mp3","music/inferi.mp3","music/courtyard-apocalypse.mp3","music/showdown.mp3","music/voldemort-end.mp3","music/obliviate.mp3","music/hp-theme.mp3", "music/fb-theme.mp3"]
    self.title = ["Hedwig's theme", "Inferi in the firestorm", "Courtyard Apocalypse", "Showdown", "Voldemort's end", "Obliviate", "Harry's Wondrous World", "Fantastic Beasts theme"]
    self.author = [ "John Williams","Nicholas Hooper", "Alexandre Desplat", "Alexandre Desplat", "Alexandre Desplat", "Alexandre Desplat", "John Williams", "James Howard"]
    self.volume = 0.5
    self.cpt = 0
    self.audioElement = document.getElementById("audio")
  }

  changeMusic(updateFct){
    self.cpt = updateFct(self.cpt)%self.musicList.length
    self.audioElement.setAttribute('src', musicList[self.cpt])
    $("#audioTitle").text(self.title[self.cpt])
    $("#audioArtist").text(self.author[self.cpt])

    btnPlay.val(textPause)
    $("#playBtn").css("display","none")
    $("#pauseBtn").css("display","inline-block")

    self.audioElement.play()
  }

  next(){
    self.stop()
    this.changeMusic(e=> (e+1))
  }

  previous(){
    self.stop()
    this.changeMusic(e=> (e-1)+self.musicList.length)
  }

  play(){
    self.audioElement.setAttribute('src', musicList[self.cpt])
    self.audioElement.volume = self.volume
    var ref = this
    
    self.audioElement.addEventListener('ended', function() {
        ref.changeMusic(e=>e+1)
    }, false)

    $("#audioTitle").text(self.title[self.cpt])
    $("#audioArtist").text(self.author[self.cpt])
    self.audioElement.play()
  }

  stop(){
    self.audioElement.pause()
    $("#audioTitle").text("")
    $("#audioArtist").text("")
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
  var txt = btnPlay.val() 
  if(txt === textPlay){
    player.play()
    btnPlay.val(textPause)
    $("#playBtn").css("display","none")
    $("#pauseBtn").css("display","inline-block")
  }else{
    player.stop()
    btnPlay.val(textPlay)
    $("#pauseBtn").css("display","none")
    $("#playBtn").css("display","inline-block")
  }
}
