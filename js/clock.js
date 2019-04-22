// Initialize global variables for general changes, e.g. background image
var bgImgNumber;
var timerID;
var analogTimerID;
var bgImg = document.body;

var initializeBackground = function(number) {
  this.bgImgNumber = number;
  bgImg.style.background = "url('./images/image" + bgImgNumber + ".jpg')";
  bgImg.style.backgroundSize = "cover";
  bgImg.style.backgroundSize = "100% 100%";
  bgImg.style.backgroundRepeat = "no-repeat";
  bgImg.style.backgroundAttachment = "fixed";
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

function pidaAikaTasalla() {
  timerID = setInterval('paivitaAika(utc)', 500);
  analogTimerID = setInterval('paivitaAnaloginAika()', 500);
  paivitaAika();
  paivitaAnaloginAika();
}

pidaAikaTasalla();

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
      var tuntiTaulukko = [-11, -10, -9, -8.5, -8, -7, -6, -5, -4, -3, -2.5, -2, -1, 0, 1,
        2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 6.75, 7, 7.5, 8, 9, 9.75, 10, 10.5, 11, 11.5, 12, 13, 13.75, 14, 15];
      utc = tuntiTaulukko[parseFloat(event.target.value)] + offset;
      utc = parseFloat(utc);
      this.$emit('changed', event.target.value);
      initializeBackground(event.target.value);
      return utc;
    }
  }
})


//TASTA ALKAA TOINEN KELLO


var clock2 = new Vue({
  el: '#clock2',
  data: {
    time2: ''
  }
});


var analogClock2 = new Vue({
  el: '#analog-clock2',
  data: {
    hourDeg2: '',
    minuteDeg2: '',
    secondDeg2: ''
  }
});

var timerID2 = setInterval('paivitaAika2(utc2)', 500);
paivitaAika2();
var analogTimerID2 = setInterval('paivitaAnaloginAika2()', 500);
paivitaAnaloginAika2();

function paivitaAika2(tunnit2) {
  var tunnitMj2 = "" + tunnit2
  var cd2 = new Date();
  if (tunnit2){
    if(tunnitMj2.charAt(0) == "-" && (tunnitMj2.charAt(tunnitMj2.length - 1) == ".")){ //Tarkistetaan, onko tuntien muutos negatiivinen sekä xx:30-vyöhykkeellä{
      cd2.setMinutes(cd2.getMinutes() - 30);
      tunnit2 += 1
    }
     else if(tunnitMj2.charAt(tunnitMj2.length - 2) == "."){ //tarkistetaan, onko tuntien muutos xx:30-vyöhykkeellä{
      cd2.setMinutes(cd2.getMinutes() + 30);
    }
    else if(tunnitMj2.charAt(tunnitMj2.length - 3) == "."){ // tarkistetaan, onko tuntien muutos xx:45-vyöhykkeellä
      cd2.setMinutes(cd2.getMinutes() + 45);
    }
    cd2.setHours(cd2.getHours() + tunnit2)
    }
  clock2.time2 = kelloTaulu(cd2.getHours(), 2) +':'+
              kelloTaulu(cd2.getMinutes(), 2) +':'+
              kelloTaulu(cd2.getSeconds(), 2);
  analogClock2.hourDeg2 = ((cd2.getHours() % 12 ) * 30) + (0.5 * cd2.getMinutes());
  analogClock2.minuteDeg2 = cd2.getMinutes() * 6;
  analogClock2.secondDeg2 = cd2.getSeconds() * 6;
};

function paivitaAnaloginAika2() {
  function analoginenKelloTaulu2() {
    var cd2 = new Date();
    var hourHand2 = document.getElementById("hour-hand_2");
    var minuteHand2 = document.getElementById("minute-hand_2");
    var secondHand2 = document.getElementById("second-hand_2");

    hourHand2.style.transform = 'rotate(' + analogClock2.hourDeg2 + 'deg)';
    minuteHand2.style.transform = 'rotate(' + analogClock2.minuteDeg2 + 'deg)';
    secondHand2.style.transform = 'rotate(' + analogClock2.secondDeg2 + 'deg)';
  }

  analoginenKelloTaulu2();
}


function kelloTaulu2(numero2, digi2) {
  var nolla2 = '';
  for(var i = 0; i < digi2; i++) {
    nolla2 += '0';
  }
  return (nolla2 + numero2).slice(-digi2);
}



// TAHAN VALIIN TOISEN KELLON TOIMINNOT



var utc2 = 0;
var o2 = new Date();
var offset2 = (o2.getTimezoneOffset() / 60);

var zone2 = new Vue({
  el: '#selector-of-timezone2',
  data: {
    timezone2: ''
  },
  methods: {
    onChange(event) {
      var tuntiTaulukko2 = [-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3, -2, -1, 0,
        1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14];
      utc2 = tuntiTaulukko2[parseFloat(event.target.value)] + offset2;
      utc2 = parseFloat(utc2);
      this.$emit('changed', event.target.value);
      initializeBackground(event.target.value);
      return utc2;
    }
  }
})



//TAHAN LOPPUU TOINEN KELLO JA KOLMAS KELLO ALKAA



var clock3 = new Vue({
  el: '#clock3',
  data: {
    time3: ''
  }
});


var analogClock3 = new Vue({
  el: '#analog-clock3',
  data: {
    hourDeg3: '',
    minuteDeg3: '',
    secondDeg3: ''
  }
});

var timerID3 = setInterval('paivitaAika3(utc3)', 500);
paivitaAika3();
var analogTimerID3 = setInterval('paivitaAnaloginAika3()', 500);
paivitaAnaloginAika3();

function paivitaAika3(tunnit3) {
  var tunnitMj3 = "" + tunnit3
  var cd3 = new Date();
  if (tunnit3){
    if(tunnitMj3.charAt(0) == "-" && (tunnitMj3.charAt(tunnitMj3.length - 1) == ".")){ //Tarkistetaan, onko tuntien muutos negatiivinen sekä xx:30-vyöhykkeellä{
      cd3.setMinutes(cd3.getMinutes() - 30);
      tunnit3 += 1
    }
     else if(tunnitMj3.charAt(tunnitMj3.length - 2) == "."){ //tarkistetaan, onko tuntien muutos xx:30-vyöhykkeellä{
      cd3.setMinutes(cd3.getMinutes() + 30);
    }
    else if(tunnitMj3.charAt(tunnitMj3.length - 3) == "."){ // tarkistetaan, onko tuntien muutos xx:45-vyöhykkeellä
      cd3.setMinutes(cd3.getMinutes() + 45);
    }
    cd3.setHours(cd3.getHours() + tunnit3)
    }
  clock3.time3 = kelloTaulu(cd3.getHours(), 2) +':'+
              kelloTaulu(cd3.getMinutes(), 2) +':'+
              kelloTaulu(cd3.getSeconds(), 2);
  analogClock3.hourDeg3 = ((cd3.getHours() % 12 ) * 30) + (0.5 * cd3.getMinutes());
  analogClock3.minuteDeg3 = cd3.getMinutes() * 6;
  analogClock3.secondDeg3 = cd3.getSeconds() * 6;
};

function paivitaAnaloginAika3() {
  function analoginenKelloTaulu3() {
    var cd3 = new Date();
    var hourHand3 = document.getElementById("hour-hand_3");
    var minuteHand3 = document.getElementById("minute-hand_3");
    var secondHand3 = document.getElementById("second-hand_3");

    hourHand3.style.transform = 'rotate(' + analogClock3.hourDeg3 + 'deg)';
    minuteHand3.style.transform = 'rotate(' + analogClock3.minuteDeg3 + 'deg)';
    secondHand3.style.transform = 'rotate(' + analogClock3.secondDeg3 + 'deg)';
  }

  analoginenKelloTaulu3();
}


function kelloTaulu3(numero3, digi3) {
  var nolla3 = '';
  for(var i = 0; i < digi3; i++) {
    nolla3 += '0';
  }
  return (nolla3 + numero3).slice(-digi3);
}



  // TAHAN VALIIN LAITETTAISI KOLMANNEN KELLON TOIMINNOT

  var utc3 = 0;
  var o3 = new Date();
  var offset3 = (o3.getTimezoneOffset() / 60);


  var zone2 = new Vue({
    el: '#selector-of-timezone3',
    data: {
      timezone3: ''
    },
    methods: {
      onChange(event) {
        var tuntiTaulukko3 = [-12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3, -2, -1, 0,
          1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14];
        utc3 = tuntiTaulukko3[parseFloat(event.target.value)] + offset;
        utc3 = parseFloat(utc3);
        this.$emit('changed', event.target.value);
        initializeBackground(event.target.value);
        return utc3;
      }
    }
  })

//TAHAN LOPPUU KOLMAS KELLO



function newClocks() {

  var selector = document.getElementById('numberOfClocks');
  var value = selector[selector.selectedIndex].value;

  if(value == 2){
    document.getElementById("clock-area2").style.visibility = "visible";
    document.getElementById("clock-area3").style.visibility = "hidden";

  }
  else if (value == 3) {
    document.getElementById("clock-area2").style.visibility = "visible";
    document.getElementById("clock-area3").style.visibility = "visible";

  }
  else {
    document.getElementById("clock-area2").style.visibility = "hidden";
    document.getElementById("clock-area3").style.visibility = "hidden";

  }



}

/*
new Vue ({
  el: '#numberOfClocks',
  methods:{

    newClocks: function () {
      if(numberOfClocks.this.value == 0) {
        document.getElementById("#clock-area2").style.opacity = 1;
      }
    }
  },

})
*/

/*  //Kellon monistus javascriptillä, ei toimi kunnolla.
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
<<<<<<< HEAD
*/

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> bd6b85e822de5144ec3cb07d648c0a42f2a48e47

=======
>>>>>>> bd6b85e822de5144ec3cb07d648c0a42f2a48e47
=======
>>>>>>> bd6b85e822de5144ec3cb07d648c0a42f2a48e47
//Tämän alle laitetaan geolocation - ominaisuus



sijaintiTieto = new Vue({
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
<<<<<<< HEAD
<<<<<<< HEAD
  }

=======
=======
>>>>>>> bd6b85e822de5144ec3cb07d648c0a42f2a48e47
    geoLocation();
  }
//if (pituus > 18) {
//  document.getElementById("demo").innerHTML = "Good day!";
//}
>>>>>>> bd6b85e822de5144ec3cb07d648c0a42f2a48e47
});

var m = document.getElementById('aikaVyohyke');
function geoLocation () {
  navigator.geolocation.getCurrentPosition(showLocation);
  sijaintiTieto.sijainti();
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
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> bd6b85e822de5144ec3cb07d648c0a42f2a48e47
=======
}
>>>>>>> bd6b85e822de5144ec3cb07d648c0a42f2a48e47
