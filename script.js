const API_KEY = "97d407d1e6b3783801fa995ab4d87df18746c1fd";
const API_URL = "https://www.marinetraffic.com/en/ais/details/ports/portid:port_id/unlocode:unlocode/mmsi:mmsi/imo:imo/eta:yyyymmddhhmm";

function getETA() {
  // Get user-specified values from form fields
  const portid = document.getElementById("portid").value;
  const unlocode = document.getElementById("unlocode").value;
  const shipid = document.getElementById("shipid").value;
  const mmsi = document.getElementById("mmsi").value;
  const imo = document.getElementById("imo").value;

  // Replace placeholders in API URL with user-specified values
  let url = API_URL.replace("port_id", portid).replace("unlocode", unlocode);
  url = url.replace("mmsi", mmsi).replace("imo", imo);

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    }
  })
  .then(response => {
    // If the server returns a successful response, parse the response as JSON
    if (response.ok) {
      return response.json();
    }
    // If the server returns a "No 'Access-Control-Allow-Origin' header is present" error,
    // try making the request in "no-cors" mode to bypass the CORS error
    else if (response.status === 0) {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        mode: "no-cors"
      });
    }
    // If the server returns any other error, throw an error
    else {
      throw new Error(response.statusText);
    }
  })
  .then(data => {
    // If the request was made in "no-cors" mode, the response will not contain any data,
    // so we cannot display the ETA
    if (data.bodyUsed) {
      document.getElementById("eta").innerHTML = "An error occurred. Please try again.";
    }
    // If the request was successful, display the ETA
    else {
      const eta = data.eta_calc;
      document.getElementById("eta").innerHTML = `ETA: ${eta}`;
    }
  })
  .catch(error => {
    console.error(error);
    document.getElementById("eta").innerHTML = "An error occurred. Please try again.";
  });
}
  