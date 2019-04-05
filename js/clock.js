
var clock = new Vue({
  el: '#clock',
  data: {
    time: ''
  }
});


var timerID = setInterval('paivitaAika(utc)', 1000);
paivitaAika(utc);

function paivitaAika(tunnit) {
  var cd = new Date();
  if (tunnit){
    cd.setHours(cd.getHours() + tunnit)
  }
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

var utc = 0;
var zone = new Vue({
  el: '#selector-of-timezone',
  data: {
    timezone: ''
  },
  methods: {
    onChange(event) {
      var value = event.target.value
      value = parseInt(value)
      utc = value;
      return utc;
    }
  }
})

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
