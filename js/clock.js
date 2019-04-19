
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
var o = new Date();
var offset = (o.getTimezoneOffset() / 60);
var zone = new Vue({
  el: '#selector-of-timezone',
  data: {
    timezone: ''
  },
  methods: {
    onChange(event) {
      var tuntiTaulukko = [-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3, -2, -1, 0,
        1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14];
      utc = tuntiTaulukko[parseFloat(event.target.value)] + offset;
      utc = parseFloat(utc);
      this.$emit('changed', event.target.value);
      return utc;
    }
  }
})

var clocksRendered = 1;
var clocks = new Vue({
  el: '#numberOfClocks',
  data: {
    multiClock: ''
  },
  methods: {
    onChange(event) {
      clocksRendered = event.target.value
      clocksRendered = parseInt(clocksRendered);
      console.log(clocksRendered)
      return clocksRendered;
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
 },
  beforeMount(){
    this.sijainti()
  }
//if (pituus > 18) {
//  document.getElementById("demo").innerHTML = "Good day!";
//}
});



var m = document.getElementById('aikaVyohyke');
function geoLocation () {
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  m.innerHTML = position.coords.longitude;
  var lon = position.coords.longitude;

  if(lon > 0 && lon < 15) {
    m.innerHTML = "UTC +01:00";
  }
  else if(lon > 15 && lon < 30) {
    m.innerHTML = "UTC +02:00";
  }
  else if(lon > 30 && lon < 45) {
    m.innerHTML = "UTC +03:00";
  }
  else if(lon > 45 && lon < 60) {
    m.innerHTML = "UTC +04:00";
  }
  else if(lon > 60 && lon < 75) {
    m.innerHTML = "UTC +05:00";
  }
}

//geoLocation();


// new Vue({
//   el: "#wholePage",
//   data: {
//     timezone: "",
//     bgImgNumber: 99
//     color: #323232
//   },
//   methods: {
//     changeBGI (event.target.value) {
//       bgImgNumber: this.event.target.value;
//       return bgImgNumber;
//     }
//   }
// })
