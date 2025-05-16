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
function UpdateStatusAutoMode(state) {
  const ElementStatus = document.getElementById("status");
  if (state) {
    ElementStatus.textContent = "Status: Auto mode is ON";
  } else {
    ElementStatus.textContent = "Status: Auto mode is OFF";
  }
}

//==================================================================================================================//

//AUTOMATSKA KONTROLA GRIJANJA//
// Dodavanje događaja za gumb "AutoON"
document.getElementById("AutoON").addEventListener("click", function () {
  const AutoModref = ref(db, "autoMod/statusAutoMode"); // Referenca n lokaciju u bazi
  set(AutoModref, 1)
    .then(() => {
      console.log("Auto mode turned ON");
      UpdateStatusAutoMode(true);

    })
    .catch((error) => {
      console.error("Error turning ON auto mode:", error);
    });
});

// Dodavanje događaja za gumb "AutoOFF"
document.getElementById("AutoOFF").addEventListener("click", function () {
  const AutoModref = ref(db, "autoMod/statusAutoMode"); // Referenca n lokaciju u bazi
  set(AutoModref, 0)
    .then(() => {
      console.log("Auto mode turned OFF");
      UpdateStatusAutoMode(false);
    })
    .catch((error) => {
      console.error("Error turning OFF auto mode:", error);
    });
});

//==================================================================================================================//

const SaveSttings = document.getElementById('SaveSttings');
const MaxTemp = document.getElementById("max_temp");
const MinTemp = document.getElementById("min_temp");

const SucssesMessage1 = 'Temperatures saved successfully.';

// Dodavanje funkcionalnosti za Max i Min temperature
SaveSttings.addEventListener('click', () => {
  if (ValidationOFTemperatures()) {
    const min = MinTemp.value;
    const max = MaxTemp.value;

    const MaxTempref = ref(db, "tempertureSettings/maxTemp");
    set(MaxTempref, parseFloat(max))
      .then(() => {
        console.log("Max temperature saved succsessfully: ", max);
      })
      .catch((error) => {
        console.error("Error saving max temperature:", error);
      });

    const MinTempref = ref(db, "tempertureSettings/minTemp");
    set(MinTempref, parseFloat(min))
      .then(() => {
        console.log("Min temperature saved succsessfully: ", min);
      })
      .catch((error) => {
        console.error("Error saving min temperature:", error);
      });

      ShowMesageModal(SucssesMessage1,InfoType);
  }
})


//==================================================================================================================//

const Overlayer = document.getElementById('Overlayer');
const ModalMessage = document.getElementById('ModalMessage');
const CloseMessage = document.getElementById('CloseMessage');

const TextFild = document.getElementById('TextFild');
const MessageType = document.getElementById('MessageType');

const ErrorMesage1 = 'Please enter both temperatures';
const ErrorMesage2 = 'The temperature must be between -25 and 35.';
const ErrorMesage3 = 'Min temperature must be lower than max temperature';

const WarningType = 'WaWarning';
const ErrorType  = 'Error';
const InfoType = 'Info';

CloseMessage.addEventListener('click', () => {
  Overlayer.style.display = 'none';
  ModalMessage.style.display = 'none';
})

function ValidationOFTemperatures() {
  const min = parseInt(MinTemp.value);
  const max = parseInt(MaxTemp.value);
  let status = true;

  if (isNaN(min) || isNaN(max)) {
    ShowMesageModal(ErrorMesage1,ErrorType);
    status = false;
  }

  if (min < -25 || min > 35 || max < 10 || max > 35) {
    ShowMesageModal(ErrorMesage2,ErrorType)
    status = false;
  }

  if (min >= max) {
    ShowMesageModal(ErrorMesage3,ErrorType)
    status = false;
  }
  return status;
}


function ShowMesageModal(mesage,type) {
  MessageType.innerText = type;
  TextFild.innerText = mesage;
  Overlayer.style.display = 'block';
  ModalMessage.style.display = 'flex';
}
//==================================================================================================================//
document.addEventListener('DOMContentLoaded', () => {
  //Čuvanje podataka za Max temperaturu
  const TempMax = document.getElementById('max_temp');
  const savedMax = localStorage.getItem('max_tempValue');
  if (savedMax) {
    TempMax.value = savedMax;
  }
  TempMax.addEventListener('input', () => {
    localStorage.setItem('max_tempValue', TempMax.value);
  });

  //Čuvanje podataka za Min temperaturu
  const TempMin = document.getElementById('min_temp');
  const savedMin = localStorage.getItem('min_tempValue');
  if (savedMin) {
    TempMin.value = savedMin;
  }
  TempMin.addEventListener('input', () => {
    localStorage.setItem('min_tempValue', TempMin.value);
  });
});