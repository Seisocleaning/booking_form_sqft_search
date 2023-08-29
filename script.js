document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const propertyAddressInput = document.getElementById('propertyAddressInput');
  const unitNumberContainer = document.getElementById('unitNumberContainer');
  const unitNumberInput = document.getElementById('unitNumberInput');
  const unitNumberSubmit = document.getElementById('unitNumberSubmit');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', () => {
    const propertyAddress = propertyAddressInput.value.trim();
    if (propertyAddress !== '') {
      if (propertyAddress.includes('#')) {
        unitNumberContainer.style.display = 'block';
        return;
      }

      fetchPropertyData(propertyAddress);
    }
  });

  unitNumberSubmit.addEventListener('click', () => {
    const propertyAddress = propertyAddressInput.value.trim();
    const unitNumber = unitNumberInput.value.trim();
    if (propertyAddress !== '' && unitNumber !== '') {
      unitNumberContainer.style.display = 'none';
      const fullPropertyAddress = `${propertyAddress} ${unitNumber}`;
      fetchPropertyData(fullPropertyAddress);
    }
  });

  clearButton.addEventListener('click', () => {
    propertyAddressInput.value = '';
    unitNumberInput.value = '';
    unitNumberContainer.style.display = 'none';
    resultContainer.innerHTML = '';
  });

  async function fetchPropertyData(address) {
    try {
      const url = `https://zillow-working-api.p.rapidapi.com/client/byaddress?propertyaddress=${encodeURIComponent(address)}`;
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
      resultContainer.innerHTML = 'Error fetching data. Please try again later.';
    }
  }

  function displayResult(data) {
    // Display property details in the resultContainer
  }
});
