
function handlePlay(audioElement){
  var musicList = ["music/hedwig.mp3","music/inferi.mp3","music/courtyard-apocalypse.mp3","music/showdown.mp3","music/voldemort-end.mp3","music/obliviate.mp3","music/hp-theme.mp3", "music/fb-theme.mp3"]
  audioElement.setAttribute('src', musicList[0])
  audioElement.volume = 0.5
  var cpt=0
  
  audioElement.addEventListener('ended', function() {
      cpt = (cpt+1)%musicList.length
      audioElement.setAttribute('src', musicList[cpt])
      this.play();
  }, false)

  audioElement.play()

}

function handlePause(audioElement){
  audioElement.pause();
  audioElement.currentTime = 0;
}


function handleMusic(){
  var textPause = "Pause the music"
  var textPlay = "Play the music"
  var btnPlay = $('#playMusic')
  var audioElement = document.getElementById("audio")
 
  var txt = btnPlay.text() 
  if(txt === textPlay){
    handlePlay(audioElement)
    btnPlay.text(textPause)
  }else{
    handlePause(audioElement)
    btnPlay.text(textPlay)
  }
}
