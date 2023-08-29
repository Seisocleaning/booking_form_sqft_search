const searchButton = document.getElementById('searchButton');
const addressInput = document.getElementById('addressInput');
const resultContainer = document.getElementById('resultContainer');

let lastRequestTime = 0; // Store the timestamp of the last request

searchButton.addEventListener('click', async () => {
  const address = addressInput.value;

  if (address.trim() !== '') {
    const currentTime = new Date().getTime();
    const timeSinceLastRequest = currentTime - lastRequestTime;

    if (timeSinceLastRequest < 500) { // Ensure at least 500 milliseconds between requests (2 requests per second)
      resultContainer.innerHTML = 'Please wait a moment before making another request.';
      return;
    }

    try {
      lastRequestTime = currentTime; // Update the last request time
      const response = await fetch(`https://zillow-working-api.p.rapidapi.com/search/byaddress?query=${encodeURIComponent(address)}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
          'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
        }
      });

      const data = await response.json();
      if (data && data.Results && data.Results.length > 0) {
        displayResult(data.Results[0]);
      } else {
        resultContainer.innerHTML = 'No property information available.';
      }
    } catch (error) {
      console.error(error);
      resultContainer.innerHTML = 'Error fetching data: ' + error.message;
    }
  }
});

function displayResult(result) {
  console.log(result); // Log the response data to the console for inspection

  if (result && result.area) {
    resultContainer.innerHTML = `
      <h2>Property Information</h2>
      <p>Area: ${result.area}</p>
    `;
  } else {
    resultContainer.innerHTML = 'No property information available.';
  }
}
