
var clock = new Vue({
  el: '#clock',
  data: {
    time: ''
  }
});

var analogClock = new Vue({
  el: '#analog-clock',
  data: {
    hourDeg: '',
    minuteDeg: '',
    secondDeg: ''
  }
});

var timerID = setInterval('paivitaAika(utc)', 500);
paivitaAika();
var analogTimerID = setInterval('paivitaAnaloginAika()', 500);
paivitaAnaloginAika();

function paivitaAika(tunnit) {
  var tunnitMj = "" + tunnit
  var cd = new Date();
  if (tunnit){
    if(tunnitMj.charAt(0) == "-" && (tunnitMj.charAt(tunnitMj.length - 1) == ".")){ //Tarkistetaan, onko tuntien muutos negatiivinen sekä xx:30-vyöhykkeellä{
      cd.setMinutes(cd.getMinutes() - 30);
      tunnit += 1
    }
     else if(tunnitMj.charAt(tunnitMj.length - 2) == "."){ //tarkistetaan, onko tuntien muutos xx:30-vyöhykkeellä{
      cd.setMinutes(cd.getMinutes() + 30);
    }
    else if(tunnitMj.charAt(tunnitMj.length - 3) == "."){ // tarkistetaan, onko tuntien muutos xx:45-vyöhykkeellä
      cd.setMinutes(cd.getMinutes() + 45);
    }
    cd.setHours(cd.getHours() + tunnit)
    }
  clock.time = kelloTaulu(cd.getHours(), 2) +':'+
              kelloTaulu(cd.getMinutes(), 2) +':'+
              kelloTaulu(cd.getSeconds(), 2);
  analogClock.hourDeg = cd.getHours() * 30;
  analogClock.minuteDeg = cd.getMinutes() * 6;
  analogClock.secondDeg = cd.getSeconds() * 6;
};

function paivitaAnaloginAika() {
  function analoginenKelloTaulu() {
    var cd = new Date();
    var hourHand = document.getElementById("hour-hand");
    var minuteHand = document.getElementById("minute-hand");
    var secondHand = document.getElementById("second-hand");

    hourHand.style.transform = 'rotate(' + analogClock.hourDeg + 'deg)';
    minuteHand.style.transform = 'rotate(' + analogClock.minuteDeg + 'deg)';
    secondHand.style.transform = 'rotate(' + analogClock.secondDeg + 'deg)';
  }

  analoginenKelloTaulu();
}


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
      var tuntiTaulukko = [-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3, -2, -1, 0,
        1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14];
      utc = tuntiTaulukko[parseFloat(event.target.value)] - 3;
      utc = parseFloat(utc);
      return utc;
    }
  }
})


//Tämän alle laitetaan geolocation - ominaisuus



 new Vue({
 el: '#sijaintiTieto',

  data: {
	  pituus:'',
    leveys:''
  },
   methods:{
    sijainti: function () {
	 if(navigator.geolocation){
	 navigator.geolocation.getCurrentPosition(this.naytaPituus);

	 }
    },
	naytaPituus:function (position) {
		this.pituus = position.coords.longitude;
    this.leveys = position.coords.latitude;
	 }
	}
//if (pituus > 18) {
//  document.getElementById("demo").innerHTML = "Good day!";
//}
});

new Vue({
el: '#aikaVyohyke',

  data: {
    aika:''
  },
  methods:{
    aika: function () {
      if(this.pituus = 22){
        alert("Hello! I am an alert box!!");
      }
    }
  }

});
