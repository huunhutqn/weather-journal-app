/* Global Variables */
const zipcodeInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const entryDateElement = document.getElementById("date");
const entryTempElement = document.getElementById("temp");
const entryContentElement = document.getElementById("content");
const baseURL = "http://localhost:8080";
const postProjectDataURL = baseURL + "/postProjectData";
const getProjectDataURL = baseURL + "/getProjectData";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
// https://openweathermap.org/current#zip
const apiKey = "&appid=412743ccf12695a6fb6bac2e825f7715&units=imperial";
const openweathermapURL =
  "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiGetInforByZipcode = (zipcode) => openweathermapURL + zipcode + apiKey;

// Event listener to add function to existing HTML DOM element
// Button Generate click
document.getElementById("generate")?.addEventListener("click", genEntry);

/* Function called by event listener */
async function genEntry() {
  const zipcodeValue = zipcodeInput.value;
  const feelingsValue = feelingsInput.value;
  const res = await getWebAPIData(zipcodeValue);
  await res.json().then(async (data) => {
    const req = {
      date: newDate,
      temp: data.main.temp,
      yourFeelings: feelingsValue,
    };
    // Post current input to server
    await postProjectData(req);
  });
  // Get project data from server
  const newProjectData = await getProjectData();

  // Set data to entry holder
  entryDateElement.innerHTML = "Today: " + newProjectData.date;
  entryTempElement.innerHTML = "Temp: " + newProjectData.temp;
  entryContentElement.innerHTML =
    "Your feelings: " + newProjectData.yourFeelings;
}

/* Function to GET Web API Data*/
async function getWebAPIData(zipcode) {
  return await fetch(apiGetInforByZipcode(zipcode), {
    method: "GET",
  }).catch((error) => {
    console.log("Error when call API GET Web API Weather Data: ", error);
  });
}

/* Function to POST data */
async function postProjectData(reqData) {
  await fetch(postProjectDataURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqData),
  }).catch((error) => {
    console.log("Error when call API POST Project Data: ", error);
  });
}

/* Function to GET Project Data */
async function getProjectData() {
  return await fetch(getProjectDataURL, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log("Error when call API GET Project Data: ", error);
    });
}
