	
function playMusic(){

  var musicList = ["music/hedwig.mp3","music/inferi.mp3","music/courtyard-apocalypse.mp3","music/showdown.mp3","music/voldemort-end.mp3","music/obliviate.mp3","music/hp-theme.mp3", "music/fb-theme.mp3"]

  var audioElement = document.createElement('audio')
  audioElement.pause();
  audioElement.currentTime = 0;
  audioElement.volume = 0.5
  audioElement.setAttribute('src', musicList[0])
  var cpt=0
  
  audioElement.addEventListener('ended', function() {
      cpt = (cpt+1)%musicList.length
      audioElement.setAttribute('src', musicList[cpt])
      this.play();
  }, false)

  audioElement.play()
}

