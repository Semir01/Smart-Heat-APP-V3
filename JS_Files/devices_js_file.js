// Konfiguracija Firebase-a
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbp42OfCdd4opQnsOC0RLZIUuW8c95YvI",
  authDomain: "smartheat-951e2.firebaseapp.com",
  databaseURL: "https://smartheat-951e2-default-rtdb.firebaseio.com",
  projectId: "smartheat-951e2",
  storageBucket: "smartheat-951e2.firebasestorage.app",
  messagingSenderId: "82815124734",
  appId: "1:82815124734:web:46e4f53d9ff41dd12911af"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
//==================================================================================================================//

function InfoMessage(state) {
  const ElementStatus = document.getElementById("status");
  const Inforef = ref(db, "info/message");

  onValue(Inforef, (snapshot) => {
    const message = snapshot.val();
    if (state) {
      ElementStatus.textContent = "Status: " + message;
    }
  })
}

//Funkcija koja mijenja status na aplikaciji u zavisnosti da li je manuelno izvršeno uključivanje ili isključivanje 
function UpdateStatus(state) {
  const ElementStatus = document.getElementById("status");

  if (state) {
    ElementStatus.textContent = "Status: Heating is ON";
  } else {
    ElementStatus.textContent = "Status: Heating is OFF";
  }
}

//Funkcija koja mijenja status na aplikaciji u zavisnosti da li je upaljeno ili izgašeno automatska kontrola 
function UpdateStatusAutoMode(state){
  const ElementStatus = document.getElementById("status");
  if(state){
     ElementStatus.textContent ="Status: Auto mode is ON";
  }else{
     ElementStatus.textContent="Status: Auto mode is OFF";
  }
 }

//==================================================================================================================//

//MANUELNA KONTROLA GRIJANJA//

const Manual_ON_button = document.getElementById("ON-button");
const Manual_OFF_button = document.getElementById("OFF-button");

// Dodavanje događaja za gumb "Turn ON"
Manual_ON_button.addEventListener("click", function () {

  if(AutoMod_Curent_Status == true){
    WarningMessageAutoMode();
    return;
  }

  const relayRef = ref(db, "relay1/status"); // Referenca na lokaciju u bazi
  set(relayRef, 1) // Postavljanje vrijednosti na `1`
    .then(() => {
      console.log("Relay 1 turned ON");
      UpdateStatus(true);
    })
    .catch((error) => {
      console.error("Error turning ON relay:", error);
    });
});
// Dodavanje događaja za gumb "Turn OFF"
Manual_OFF_button.addEventListener("click", function () {

  if(AutoMod_Curent_Status == true){
    WarningMessageAutoMode();
    return;
  }

  const relayRef = ref(db, "relay1/status"); // Referenca na lokaciju u bazi
  set(relayRef, 0) // Postavljanje vrijednosti na `0`
    .then(() => {
      console.log("Relay 1 turned OFF");
      UpdateStatus(false);
    })
    .catch((error) => {
      console.error("Error turning OFF relay:", error);
    });
});

//==================================================================================================================//
//Funkcija za ucitavanje podataka sa baze za senzor 
function GetSensorData() {
  const temReference = ref(db, 'sensor/temperature');
  const humyReference = ref(db, 'sensor/humidity');

  onValue(temReference, (snapshot) => {
    const temperature = snapshot.val();
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('temperature').style.color = 'rgba(30, 250, 1, 0.993)';
  });

  onValue(humyReference, (snapshot) => {
    const humidity = snapshot.val();
    document.getElementById("humidity").textContent = humidity;
    document.getElementById('humidity').style.color = 'rgba(30, 250, 1, 0.993)';
  })
}
//Poziv funkcije 
GetSensorData();

//==================================================================================================================//

//Čuvanje podataka u localstorage za naziv uređaja 
document.addEventListener('DOMContentLoaded', () => {
  //Čuvanje podataka za Naziv uređaja
  const name = document.getElementById('device-name');
  const savedName = localStorage.getItem('device-nameValue');
  if (savedName) {
    name.value = savedName;
  }

  name.addEventListener('input', () => {
    localStorage.setItem('device-nameValue', name.value);
  });
});

//==================================================================================================================//
let AutoMod_Curent_Status = false;

const StatusAutoMod_Ref= ref(db,'autoMod/statusAutoMode');
onValue(StatusAutoMod_Ref, (snapshot)=>{
  const Status_AutoMod = snapshot.val();

  AutoMod_Curent_Status = Status_AutoMod;

  if(Status_AutoMod){
    UpdateStatusAutoMode(true)
    InfoMessage(true)    
  }
  else{
    UpdateStatusAutoMode(false)
  }
})

//==================================================================================================================//

const CloseMessage = document.getElementById('CloseMessage');
const AutoMode_Settings = document.getElementById('AutoMode_Settings');

const Overlayer = document.getElementById('Overlayer');
const ModalMessage = document.getElementById('ModalMessage');

document.addEventListener('DOMContentLoaded',()=>{
  CloseMessage.addEventListener('click',()=>{
    Overlayer.style.display = "none";
    ModalMessage.style.display = "none";
  })

  AutoMode_Settings.addEventListener('click',()=>{
    window.location.href ="settings.html";
  })
})

function   WarningMessageAutoMode() {
    if(AutoMod_Curent_Status == true){
      Overlayer.style.display = "block";
      ModalMessage.style.display = "block";
    }
}
