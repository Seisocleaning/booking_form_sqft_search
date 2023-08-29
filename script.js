// Make sure to include your import statements here
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const addressInput = document.getElementById('addressInput');
  const searchButton = document.getElementById('searchButton');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', async () => {
    const address = addressInput.value.trim();
    if (address === '') {
      return;
    }

    const url = `https://zillow-working-api.p.rapidapi.com/client/byaddress?propertyaddress=${encodeURIComponent(address)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
        'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Parse the JSON response
      displayResult(result); // Call the function to display the result
    } catch (error) {
      console.error(error);
    }
  });

  function displayResult(result) {
    // Your code to display the result goes here
    // You can access properties of the result object and update the resultContainer
  }
});
