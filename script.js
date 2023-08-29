// Initialize Google Places Autocomplete
const addressInput = document.getElementById('addressInput');
const autocomplete = new google.maps.places.Autocomplete(addressInput);

const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');

let lastRequestTime = 0; // Store the timestamp of the last request

searchButton.addEventListener('click', async () => {
  const address = addressInput.value;

  if (address.trim() !== '') {
    const currentTime = new Date().getTime();
    const timeSinceLastRequest = currentTime - lastRequestTime;

    if (timeSinceLastRequest < 500) {
      resultContainer.innerHTML = 'Please wait a moment before making another request.';
      return;
    }

    try {
      lastRequestTime = currentTime;
      const response = await fetch(`https://zillow-working-api.p.rapidapi.com/search/byaddress?query=${encodeURIComponent(address)}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
          'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
        }
      });

      const data = await response.json();
      displayResult(data);
    } catch (error) {
      console.error(error);
      resultContainer.innerHTML = 'Error fetching data: ' + error.message;
    }
  }
});

function displayResult(data) {
  console.log(data);

  resultContainer.innerHTML = `
    <h2>Property Information</h2>
    <p>Address: ${data.address}</p>
    <p>Area: ${data.area} sq ft</p>
  `;
}
