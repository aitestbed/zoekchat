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

  function updateMap() {
    const selectedLocations = Array.from(locationCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const selectedCategories = Array.from(categoryCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const postcode = postcodeInput.value;

    const queryParams = new URLSearchParams();
    if (selectedLocations.length > 0) queryParams.append('locations', selectedLocations.join(','));
    if (selectedCategories.length > 0) queryParams.append('categories', selectedCategories.join(','));
    if (postcode) queryParams.append('postcode', postcode);

    const mapUrl = 'https://localfocuswidgets.net/6451218aa5b9e?activate=asa';
    document.getElementById('map').src = `${mapUrl}&${queryParams.toString()}`;
  }
});
