// Initialize Google Places Autocomplete
const addressInput = document.getElementById('addressInput');
const autocomplete = new google.maps.places.Autocomplete(addressInput);

const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');

let lastRequestTime = 0; // Store the timestamp of the last request

autocomplete.addListener('place_changed', () => {
  const selectedPlace = autocomplete.getPlace();
  if (selectedPlace && selectedPlace.formatted_address) {
    addressInput.value = selectedPlace.formatted_address;
    performSearch(selectedPlace.formatted_address);
  }
});

searchButton.addEventListener('click', () => {
  const address = addressInput.value;
  if (address.trim() !== '') {
    performSearch(address);
  }
});

function performSearch(address) {
  const currentTime = new Date().getTime();
  const timeSinceLastRequest = currentTime - lastRequestTime;

  if (timeSinceLastRequest < 500) {
    resultContainer.innerHTML = 'Please wait a moment before making another request.';
    return;
  }

  lastRequestTime = currentTime;
  fetchPropertyInformation(address);
}

async function fetchPropertyInformation(address) {
  try {
    const response = await fetch(`https://zillow-working-api.p.rapidapi.com/byaddress?propertyaddress=${encodeURIComponent(address)}`, {
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

function displayResult(data) {
  console.log(data);

  const result = data;

  resultContainer.innerHTML = `
    <h2>Property Information</h2>
    <p>Address: ${result.PropertyAddress}</p>
    <p>Area: ${result.Area}</p>
    <p>Bedrooms: ${result.Bedrooms}</p>
    <p>Bathrooms: ${result.Bathrooms}</p>
  `;
}
