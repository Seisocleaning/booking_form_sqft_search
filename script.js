document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const propertyAddressInput = document.getElementById('propertyAddressInput');
  const houseNumberInput = document.getElementById('houseNumberInput');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', async () => {
    const propertyAddress = propertyAddressInput.value;
    const houseNumber = houseNumberInput.value;

    let fullAddress = propertyAddress;
    if (houseNumber.trim() !== '') {
      fullAddress += ` #${houseNumber}`;
    }

    if (propertyAddress.trim() !== '') {
      try {
        resultContainer.innerHTML = '<div class="property-container">Loading...</div>';

        const url = `https://zillow-working-api.p.rapidapi.com/client/byaddress?propertyaddress=${encodeURIComponent(fullAddress)}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'b992a0a4c9mshe98194ed211e071p1a8a00jsn9be933e403ac',
            'X-RapidAPI-Host': 'zillow-working-api.p.rapidapi.com'
          }
        };

        const response = await fetch(url, options);
        const data = await response.json();

        displayResult(data);
      } catch (error) {
        console.error(error);
        resultContainer.innerHTML = `<div class="property-container">Error fetching data: ${error.message}</div>`;
      }
    }
  });

  function displayResult(data) {
    if (data && data.propertyDetails && data.propertyDetails.livingArea) {
      const livingArea = data.propertyDetails.livingArea;
      resultContainer.innerHTML = `<div class="property-container">Total Home Sq. Ft.: ${livingArea} Sq. Ft.</div>`;
    } else {
      resultContainer.innerHTML = `<div class="property-container">Total Home Sq. Ft. not found, please search on Google for and enter manually.</div>`;
    }
  }
});
