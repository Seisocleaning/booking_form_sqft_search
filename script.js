document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const propertyAddressInput = document.getElementById('propertyaddress');
  const resultContainer = document.getElementById('propertyaddress');

  searchButton.addEventListener('click', async () => {
    const propertyAddress = propertyaddress.value;
    if (propertyAddress.trim() !== '') {
      try {
        const url = `https://zillow-working-api.p.rapidapi.com/client/byaddress?propertyaddress=${encodeURIComponent(propertyAddress)}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
            'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
          }
        };

        const response = await fetch(url, options);
        const result = await response.text();

        displayResult(result);
      } catch (error) {
        console.error(error);
        resultContainer.innerHTML = 'Error fetching data: ' + error.message;
      }
    }
  });

  function displayResult(result) {
    // Your display result logic here
    resultContainer.innerHTML = result;
  }
});
