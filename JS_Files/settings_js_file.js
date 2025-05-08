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

//AUTOMATSKA KONTROLA GRIJANJA//
// Dodavanje događaja za gumb "AutoON"
document.getElementById("AutoON").addEventListener("click",function(){
    const AutoModref = ref(db,"autoMod/statusAutoMode"); // Referenca n lokaciju u bazi
    set(AutoModref, 1)
    .then(()=> {
      console.log("Auto mode turned ON");
      UpdateStatusAutoMode(true);

    })
    .catch((error) =>{
      console.error("Error turning ON auto mode:", error);
    });
  });

  // Dodavanje događaja za gumb "AutoOFF"
  document.getElementById("AutoOFF").addEventListener("click",function(){
    const AutoModref = ref(db,"autoMod/statusAutoMode"); // Referenca n lokaciju u bazi
    set(AutoModref, 0)
    .then(()=> {
      console.log("Auto mode turned OFF");
      UpdateStatusAutoMode(false);
    })
    .catch((error) =>{
      console.error("Error turning OFF auto mode:", error);
    });
  });
  
  //==================================================================================================================//
  
  // Dodavanje funkcionalnosti za Max i Min temperature
  document.getElementById("max_temp").addEventListener("input",function (){
    const MaxTemp=this.value;
  
    if(isNaN(MaxTemp) || MaxTemp ===""){
      console.error("Invalide MaxTemp value. Must be a number.");
      return;
    }
  
    const MaxTempref = ref(db,"tempertureSettings/maxTemp");
    set(MaxTempref,parseFloat(MaxTemp))
    .then(()=>{
      console.log("Max temperature saved succsessfully: ",MaxTemp);
    })
    .catch((error)=>{
      console.error("Error saving max temperature:",error);
    });
  });
  document.getElementById("min_temp").addEventListener("input",function (){
    const MinTemp=this.value;
  
    if(isNaN(MinTemp) || MinTemp ===""){
      console.error("Invalide MinTemp value. Must be a number.");
      return;
    }
  
    const MinTempref = ref(db,"tempertureSettings/minTemp");
    set(MinTempref,parseFloat(MinTemp))
    .then(()=>{
      console.log("Min temperature saved succsessfully: ",MinTemp);
    })
    .catch((error)=>{
      console.error("Error saving min temperature:",error);
    });
  });
  
  //==================================================================================================================//
  document.addEventListener('DOMContentLoaded',()=>{
    //Čuvanje podataka za Max temperaturu
    const TempMax = document.getElementById('max_temp');
    const savedMax = localStorage.getItem('max_tempValue');
    if(savedMax){
      TempMax.value=savedMax;
    }
    TempMax.addEventListener('input',()=>{
      localStorage.setItem('max_tempValue',TempMax.value);
    });
  
    //Čuvanje podataka za Min temperaturu
    const TempMin = document.getElementById('min_temp');
    const savedMin = localStorage.getItem('min_tempValue');
    if(savedMin){
      TempMin.value=savedMin;
    }
    TempMin.addEventListener('input',()=>{
      localStorage.setItem('min_tempValue',TempMin.value);
    });
  });

  //==================================================================================================================//