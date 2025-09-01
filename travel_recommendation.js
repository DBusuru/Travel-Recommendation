async function fetchData() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function searchRecommendations() {
  const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  const data = await fetchData();
  const container = document.getElementById("recommendationContainer");
  container.innerHTML = ""; // Clear previous results

  let results = [];

  if (keyword.includes("beach")) {
    results = data.beaches;
  } else if (keyword.includes("temple")) {
    results = data.temples;
  } else if (keyword.includes("country")) {
    results = data.countries;
  }

  if (results.length === 0) {
    container.innerHTML = "<p>No results found. Try 'beach', 'temple', or 'country'.</p>";
    return;
  }

  results.forEach(place => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}">
      <div>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("recommendationContainer").innerHTML = "";
}
