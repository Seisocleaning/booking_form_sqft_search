const searchButton = document.getElementById('searchButton');
const addressInput = document.getElementById('addressInput');
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
      console.log(data); // Log the response data to the console for inspection
      displayResult(data);
    } catch (error) {
      console.error(error);
      resultContainer.innerHTML = 'Error fetching data';
    }
  }
});

function displayResult(data) {
  const result = data.result; // Update this line based on the actual response structure

  resultContainer.innerHTML = `
    <h2>Property Information</h2>
    <p>Address: ${result.address}</p>
    <p>Area: ${result.area} sq ft</p>
  `;
}
