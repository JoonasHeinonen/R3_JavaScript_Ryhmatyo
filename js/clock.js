
var clock = new Vue({
  el: '#clock',
  data: {
    time: ''
  }
});


var timerID = setInterval('paivitaAika(utc)', 500);
paivitaAika();

function paivitaAika(tunnit) {
  var tunnitMj = "" + tunnit
  var cd = new Date();
  if (tunnit){
    if(tunnitMj.charAt(0) == "-" && (tunnitMj.charAt(tunnitMj.length - 1) == "." &&  tunnitMj.charAt(tunnitMj.length - 1) =="5")){
      cd.setMinutes(cd.getMinutes() - 30);
      tunnit += 1
    }
    else if(tunnitMj.charAt(tunnitMj.length - 2) == "."){
      cd.setMinutes(cd.getMinutes() + 30);
    }
    else if(tunnitMj.charAt(tunnitMj.length - 3) == "."){
      cd.setMinutes(cd.getMinutes() + 45);
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
