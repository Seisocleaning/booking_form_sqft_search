document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const propertyAddressInput = document.getElementById('propertyAddressInput');
  const unitNumberContainer = document.getElementById('unitNumberContainer');
  const unitNumberInput = document.getElementById('unitNumberInput');
  const resultContainer = document.getElementById('resultContainer');

  searchButton.addEventListener('click', async () => {
    const propertyAddress = propertyAddressInput.value;
    if (propertyAddress.trim() !== '') {
      if (propertyAddress.includes('#')) {
        unitNumberContainer.style.display = 'block';
        return;
      }
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
        const data = await response.json();

        displayResult(data);
      } catch (error) {
        console.error(error);
        resultContainer.innerHTML = 'Error fetching data. Please try again later.';
      }
    }
  });

  clearButton.addEventListener('click', () => {
    propertyAddressInput.value = '';
    unitNumberInput.value = '';
    unitNumberContainer.style.display = 'none';
    resultContainer.innerHTML = '';
  });

  unitNumberInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchWithUnitNumber();
    }
  });

  function searchWithUnitNumber() {
    const propertyAddress = propertyAddressInput.value;
    const unitNumber = unitNumberInput.value;
    
    if (propertyAddress.trim() !== '' && unitNumber.trim() !== '') {
      const fullPropertyAddress = `${propertyAddress} ${unitNumber}`;
      unitNumberContainer.style.display = 'none';
      
      // ... (existing code for API request with fullPropertyAddress)
      
      displayResult(data);
    }
  }

  function displayResult(data) {
    if (data && data.propertyDetails && data.propertyDetails.livingArea) {
      const livingArea = data.propertyDetails.livingArea;
      resultContainer.innerHTML = `Total Home Sq. Ft.: ${livingArea} Sq. Ft.`;
    } else {
      resultContainer.innerHTML = 'Total Home Sq. Ft. not found, please search on Google for and enter manually.';
    }
  }
});
