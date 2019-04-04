
var clock = new Vue({
  el: '#clock',
  data: {
    time: ''
  }
});

var timerID = setInterval(paivitaAika, 1000);
paivitaAika();

function paivitaAika() {
  var cd = new Date();
  clock.time = kelloTaulu(cd.getHours(), 2) +':'+
              kelloTaulu(cd.getMinutes(), 2) +':'+
              kelloTaulu(cd.getSeconds(), 2);
};


function kelloTaulu(numero, digi) {
  var nolla = '';
  for(var i = 0; i < digi; i++) {
    nolla += '0';
  }
  return (nolla + numero).slice(-digi);
}


//Tämän alle laitetaan geolocation - ominaisuus

var loc = document.getElementById("sijainti");

function haeSijainti() {

}

function naytaSijainti(sijainti) {
  loc.innerHTML = "Leveysaste: " + "Pituusaste: ";
}
