// Initialize Google Places Autocomplete
const addressInput = document.getElementById('addressInput');
const autocomplete = new google.maps.places.Autocomplete(addressInput);

const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');

searchButton.addEventListener('click', async () => {
  const address = addressInput.value;

  if (address.trim() !== '') {
    try {
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
  console.log(data); // Log the response data to the console for inspection

  // Adjust the rest of your display logic based on the actual structure
  const result = data; // Assuming the entire response is in the 'result' object

  resultContainer.innerHTML = `
    <h2>Property Information</h2>
    <p>Address: ${result.address}</p>
    <p>Area: ${result.area} sq ft</p>
  `;
}
