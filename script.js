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
        // ... (existing code for API request)

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
    // ... (existing code to display property details)
  }
});
