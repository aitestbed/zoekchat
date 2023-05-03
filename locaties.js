document.addEventListener('DOMContentLoaded', () => {
  const locationCheckboxes = document.querySelectorAll('input[name="location"]');
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  const postcodeInput = document.getElementById('postcode');

  locationCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateMap);
  });

  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateMap);
  });

  postcodeInput.addEventListener('input', updateMap);

  function generateUrl() {
    const locationParams = {
      Noord: 'an',
      Zuid: 'az',
      Zuidoost: 'azo',
      'Nieuw-West': 'anw',
      West: 'aw',
      Oost: 'ao',
    };

    const categoryParams = {
      Taal: 't',
      Geld: 'g',
      Digitaal: 'd',
    };

    const selectedLocations = Array.from(locationCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => locationParams[checkbox.value]);

    const selectedCategories = Array.from(categoryCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => categoryParams[checkbox.value]);

    const postcode = postcodeInput.value;

    const allLocations = Object.values(locationParams);

    const activateParams = selectedLocations.length === 0 ? allLocations : selectedLocations;
    const queryParams = new URLSearchParams();

    if (postcode) queryParams.append('postcode', postcode);

    const mapUrl = 'https://localfocuswidgets.net/6451e73d1d2b8?hide=dropdowns';
    const combinations = [];

    for (const location of activateParams) {
      const categories = selectedCategories.length === 0 ? [''] : selectedCategories;
      for (const category of categories) {
        combinations.push(`${location}${category}`);
      }
    }

    for (const combination of combinations) {
      queryParams.append('activate|sa', combination);
    }

    return `${mapUrl}?${queryParams.toString()}`;
  }

  function updateMap() {
    document.getElementById('map').src = generateUrl();
  }
});
