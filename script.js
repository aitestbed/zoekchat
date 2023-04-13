async function search() {
  const searchTerm = document.getElementById("searchTerm").value.trim();

  if (searchTerm.length === 0) {
    return;
  }

  categoryContainers.forEach((container) => {
    container.style.display = "none";
  });

  chatMessages.innerHTML += '<div class="chat-message user"><span>' + searchTerm + '</span></div>';

  const categories = [
    { name: "boeken", facet: "&facet=type(book)&refine=true" },
    { name: "dvds", facet: "&facet=type(movie)&refine=true" },
    { name: "activiteiten", facet: "%20table:Activiteiten&refine=true" },
    { name: "cursussen", facet: "%20table:jsonsrc&refine=true" },
  ];

  for (const category of categories) {
    const results = await getResults(searchTerm, category.facet);
    if (results.length > 0) {
      showResults(category.name, results);
      document.getElementById(category.name + "Container").style.display = "block";
    } else {
      document.getElementById(category.name + "Container").style.display = "none";
    }
  }

  const searchResultsUrl = `https://www.oba.nl/zoeken/?q=${encodeURIComponent(searchTerm)}`; // Replace with the appropriate URL for the search results page
  chatMessages.innerHTML += `<div class="chat-message bot"><span>Hier zijn de resultaten van je zoekvraag voor <a href="${searchResultsUrl}" target="_blank">"${searchTerm}"</a>. Kan ik nog iets voor je zoeken?</span></div>`;

  const keywords = ["openingstijden", "open", "geopend"];
  if (keywords.some((word) => searchTerm.toLowerCase().includes(word.toLowerCase()))) {
    const editorialResults = await getResults("format:oba.nl%20" + searchTerm, "", "&pagesize=1");
    if (editorialResults.length > 0) {
      const editorialResult = editorialResults[0];
      const summary = editorialResult.summaries[0];
      const detailLink = editorialResult.detailLink;
      chatMessages.innerHTML += `<div class="chat-message bot"><span>${summary} <a href="${detailLink}" target="_blank">Meer</a></span></div>`;
    } else {
      chatMessages.innerHTML += '<div class="chat-message bot"><span>Geen redactionele inhoud gevonden. Kan ik nog iets voor je zoeken?</span></div>';
    }
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}
