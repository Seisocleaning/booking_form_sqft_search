// Format user input to match the expected address structure
function formatAddressInput(input) {
  const cleanedInput = input.replace(/,\s*Canada$/, '');
  const formattedInput = cleanedInput.replace(/\b\w+/g, match => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());
  return formattedInput.trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const addressInput = document.getElementById('addressInput');
  const resultContainer = document.getElementById('resultContainer');

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
    const result = data.Results[0]; // Use "Results" instead of "results" based on the example response

    resultContainer.innerHTML = `
      <h2>Property Information</h2>
      <p>Address: ${result.address}</p>
      <p>Area: ${result.area} sq ft</p>
    `;
  }
});
