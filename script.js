document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const propertyAddressInput = document.getElementById('propertyAddressInput');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', async () => {
    const propertyAddress = propertyAddressInput.value;
    if (propertyAddress.trim() !== '') {
      const url = `https://zillow-working-api.p.rapidapi.com/client/byaddress?propertyaddress=${encodeURIComponent(propertyAddress)}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
          'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        resultContainer.innerHTML = result; // Display the result
      } catch (error) {
        console.error(error);
        resultContainer.innerHTML = 'Error fetching data: ' + error.message;
      }
    }
  });
});
