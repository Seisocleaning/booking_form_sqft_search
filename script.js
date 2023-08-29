document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const addressInput = document.getElementById('addressInput');
  const resultContainer = document.getElementById('resultContainer');

  let map; // Declare map as a global variable

  // Initialize Google Places Autocomplete
  const autocomplete = new google.maps.places.Autocomplete(addressInput);

  searchButton.addEventListener('click', async () => {
    const userInput = addressInput.value;
    const formattedAddress = formatAddressInput(userInput);

    if (formattedAddress.trim() !== '') {
      try {
        const response = await fetch(`https://zillow-working-api.p.rapidapi.com/search/byaddress?query=${encodeURIComponent(formattedAddress)}`, {
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
    const result = data.Results[0];

    resultContainer.innerHTML = `
      <h2>Property Information</h2>
      <p>Address: ${result.address}</p>
      <p>Area: ${result.area} sq ft</p>
    `;

    // Initialize Google Map
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: result.latLong.lat, lng: result.latLong.lon },
      zoom: 15
    });
  }

  function formatAddressInput(input) {
    return input; // You can customize this function if needed
  }
});
