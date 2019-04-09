
var clock = new Vue({
  el: '#clock',
  data: {
    time: ''
  }
});


var timerID = setInterval('paivitaAika(utc)', 500);
paivitaAika();

function paivitaAika(tunnit) {
  var cd = new Date();
  if (tunnit){
    if(tunnit == -12.5 || tunnit == -6.5){
      cd.setMinutes(cd.getMinutes() - 30);
      tunnit += 1
    }
    else if(tunnit == 0.5 || tunnit == 1.5 || tunnit == 2.5 ||tunnit == 3.5 || tunnit == 7.5){
      cd.setMinutes(cd.getMinutes() + 30);
    }
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
      var tuntiTaulukko = [-15,-14,-13,-12.5,-12,-11,-10,-9,-8,-7,-6.5,-6,-5,-4,-3,-2,-1,0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,7.5,8,9,10];
      utc = tuntiTaulukko[parseFloat(event.target.value)];
      console.log(utc);
      console.log(utc + utc);
      utc = parseFloat(utc);

      return utc;
    }
  }
})


//Tämän alle laitetaan geolocation - ominaisuus



 new Vue({
 el: '#sijaintiTieto',

  data: {
	  pituus:''
  },
   methods:{
    sijainti: function () {
	 if(navigator.geolocation){
	 navigator.geolocation.getCurrentPosition(this.naytaPituus);


	 }
    },
	naytaPituus:function (position) {
		this.pituus = position.coords.longitude;
	 }
	}
//if (pituus > 18) {
//  document.getElementById("demo").innerHTML = "Good day!";
//}

});
