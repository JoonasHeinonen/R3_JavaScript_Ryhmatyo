
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

var loc = new Vue({
  el: '#navigator',
  data: {
    location: ''
  }
});


function haeSijainti() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(naytaSijainti);
  }
}

function naytaSijainti(sijainti) {
  loc.innerHTML = "Leveysaste: "
   + position.coords.latitude
   + "Pituusaste: "
   + position.coords.longitude;
}
