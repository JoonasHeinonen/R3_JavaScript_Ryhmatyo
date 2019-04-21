// Initialize global variables for general changes, e.g. background image
var bgImgNumber;

var bgImg = document.getElementById("wholePage");

var initializeBackground = function(number) {
  this.bgImgNumber = number;
  bgImg.style.background = "url('./images/image" + bgImgNumber + ".jpg')";
  bgImg.style.backgroundSize = "100% 100%";
}

initializeBackground(99);

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
  analogClock.hourDeg = ((cd.getHours() % 12 ) * 30) + (0.5 * cd.getMinutes());
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
      initializeBackground(utc);
      return utc;
    }
  }
})

var previousClones = 0;
var clonesRendered = 0;
var clocks = new Vue({
  el: '#numberOfClocks',
  data: {
    multiClock: ''
  },
  methods: {
    onChange(event) {
      previousClones = clonesRendered;
      clonesRendered = event.target.value
      clonesRendered = parseInt(clonesRendered);
      
     
      function cloneDiv(){
        console.log('Clones to be rendered:' + clonesRendered)
        console.log('Previous clones: ' + previousClones)
        for(var i = 0; i < clonesRendered; i++){
          var cloning = document.getElementById('area-to-clone')
          clone = cloning.cloneNode(true);
          clone.id = 'clock_clone';
          document.getElementById('cloning-area').appendChild(clone);
          console.log('Clone ' + (i+1) + ' added')

        }
        var j = 1;
        var previous = previousClones;
        while(clonesRendered < previous){
          document.getElementById("cloning-area").removeChild(clone);
          console.log('Clone ' + (j) + ' removed');
          previous -=1;
          j +=1;
        }
      }
      cloneDiv();
      return previousClones;
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
    this.sijainti();
    geoLocation();
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
    m.innerHTML = "(UTC +01:00) Oslo, Roma, Lagos";
  }
  else if(lon > 15 && lon < 30) {
    m.innerHTML = "(UTC +02:00) Helsinki, Riga, Jerusalem";
  }
  else if(lon > 30 && lon < 45) {
    m.innerHTML = "(UTC +03:00) Moscow, Doha, Nairobi";
  }
  else if(lon > 45 && lon < 60) {
    m.innerHTML = "(UTC +04:00) Dubai, Tbilisi, Saint-Denis";
  }
  else if(lon > 60 && lon < 75) {
    m.innerHTML = "(UTC +05:00) Oral, Andijon, Yekaterinburg";
  }
  else if(lon > 75 && lon < 90) {
    m.innerHTML = "(UTC +06:00) Almaty, Omsk, Ürümqi";
  }
  else if(lon > 90 && lon < 105) {
    m.innerHTML = "(UTC +07:00) Bangkok, Krasnoyarsk, Pontianak";
  }
  else if(lon > 105 && lon < 120) {
    m.innerHTML = "(UTC +08:00) Tutong, Irkutsk, Singapore";
  }
  else if(lon > 120 && lon < 135) {
    m.innerHTML = "(UTC +09:00) Ambon, Seoul, Tokyo";
  }
  else if(lon > 135 && lon < 150) {
    m.innerHTML = "(UTC +10:00) Vladivostok, Brisbane, Colonia";
  }
  else if(lon > 150 && lon < 165) {
    m.innerHTML = "(UTC +11:00) Arafa, Tofol, Kolonia";
  }
  else if(lon > 165 && lon < 180) {
    m.innerHTML = "(UTC +12:00) Bilibino, Auckland, Tarawa";
  }
}