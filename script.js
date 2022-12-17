async function getETA() {
  const portid = portidInput.value;
  const mmsi = mmsiInput.value;
  const API_KEY = '97d407d1e6b3783801fa995ab4d87df18746c1fd';

  try {
    const response = await fetch(`https://services.marinetraffic.com/api/etatoport/${API_KEY}?v=1&portid=${portid}&mmsi=${mmsi}&msgtype=simple&protocol=xml}`);
    const data = await response.json();
    etaDiv.innerHTML = `ETA: ${data.eta}`;
  } catch (error) {
    // handle any errors
    etaDiv.innerHTML = 'Error getting ETA';
  }
}
