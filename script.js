document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const propertyAddressInput = document.getElementById('propertyAddressInput');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', async () => {
    const propertyAddress = propertyAddressInput.value;
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

        const response = await axios(url, options);
        const data = response.data;

        displayResult(data);
      } catch (error) {
        console.error(error);
        resultContainer.innerHTML = 'Error fetching data: ' + error.message;
      }
    }
  });

  function displayResult(data) {
    // Your display result logic here
    resultContainer.innerHTML = JSON.stringify(data, null, 2);
  }
});
