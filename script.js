document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const addressInput = document.getElementById('addressInput');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', async () => {
    const userInput = addressInput.value;
    const formattedAddress = formatAddressInput(userInput);

    if (formattedAddress.trim() !== '') {
      try {
        const response = await axios.get('https://zillow-working-api.p.rapidapi.com/client/byaddress', {
          params: {
            propertyaddress: formattedAddress
          },
          headers: {
            'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
            'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
          }
        });

        const data = response.data;
        displayResult(data);
      } catch (error) {
        console.error(error);
        resultContainer.innerHTML = 'Error fetching data: ' + error.message;
      }
    }
  });

  function displayResult(data) {
    resultContainer.innerHTML = ''; // Clear previous results

    if (data.message === "200: Success" && data.propertyDetails) {
      const property = data.propertyDetails;

      resultContainer.innerHTML += `
        <h2>Property Information</h2>
        <p>Address: ${property.address.streetAddress}, ${property.address.city}, ${property.address.state} ${property.address.zipcode}</p>
        <p>Bedrooms: ${property.bedrooms}</p>
        <p>Bathrooms: ${property.bathrooms}</p>
        <p>Price: ${property.price} ${property.currency}</p>
        <p>Year Built: ${property.yearBuilt}</p>
        <p>Living Area: ${property.livingArea || property.livingAreaValue} ${property.livingAreaUnitsShort || property.livingAreaUnits}</p>
        <p>Home Type: ${property.homeType}</p>
      `;
    } else {
      resultContainer.innerHTML = 'No property found.';
    }
  }

  function formatAddressInput(input) {
    // You can customize this function to format the user input as needed
    return input;
  }
});
