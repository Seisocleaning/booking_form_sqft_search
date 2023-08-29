document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const addressInput = document.getElementById('addressInput');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', fetchPropertyInfo);

  async function fetchPropertyInfo() {
    const userInput = addressInput.value;
    const formattedAddress = formatAddressInput(userInput);

    if (formattedAddress.trim() !== '') {
      const url = `https://zillow-working-api.p.rapidapi.com/client/byaddress?propertyaddress=${encodeURIComponent(formattedAddress)}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
          'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        displayResult(data);
      } catch (error) {
        console.error(error);
        resultContainer.innerHTML = 'Error fetching data: ' + error.message;
      }
    }
  }

  function displayResult(data) {
    if (data.propertyDetails) {
      const property = data.propertyDetails;

      resultContainer.innerHTML = `
        <h2>Property Information</h2>
        <p>Address: ${property.address.streetAddress}, ${property.address.city}, ${property.address.state} ${property.address.zipcode}</p>
        <p>Area: ${property.livingArea || property.livingAreaValue} sq ft</p>
      `;
    } else {
      resultContainer.innerHTML = 'No property found.';
    }
  }

  function formatAddressInput(input) {
    return input;
  }
});
