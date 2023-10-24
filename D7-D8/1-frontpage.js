async function getProducts() {
  const response = await fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4Mjg0ODc3Y2RhYTAwMTQ2ZGYzOTQiLCJpYXQiOjE2OTgxODAzMDAsImV4cCI6MTY5OTM4OTkwMH0.V-dy8WyqT6In9AMCUPq886_6SuWfe4s3VTsc9vQ_dSY"
    }
  });
  const data = await response.json();
  return data;
}
function displayProducts(data) {
  const productSection = document.getElementById("row");
  productSection.innerHTML = data.map((product) => {
    return `
      <div class='col col-4 mt-5 column'>
        <div class="card border-1 rounded p-1">
          <img src='${product.imageUrl}' class="img-fluid card-img-top" alt='${product.alt}' />
          <div class="card-body">
            <div class="d-flex justify-content-evenly align-items-center">
              <div class="d-flex flex-column">
                <span class="product-title"> ${product.name}</span>
                <span> ${product.brand}</span>
                <span class="custom-ellipsis"> ${product.description}</span>
              </div>
              <span class="price-style"> €${product.price}</span>
           </div>
          <hr>
            <div class="d-flex justify-content-between mt-2">
              <a href="./4-productdetails.html?id=${product._id}"><i class="bi bi-eye-fill text-color"> </i> View details</a>
              <button class="border border-none"> <i class="fas fa-shopping-cart text-color"></i> Buy</button>
            </div>
          </div >
        </div>
      </div>`;
  }).join("");
}

const searchProduct = () => {
  let query = document.getElementById('searchInput').value;
  let allTitles = document.querySelectorAll(".product-title");
  console.log(
    query,
    allTitles[0].innerText.toLowerCase().includes(query.toLowerCase())
  );
  allTitles.forEach((title) => {
    const currCard = title.closest('.column');
    if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
      currCard.style.display = "none";
    } else {
      currCard.style.display = "block";
    }
  });
}

const filterByCategory = (category) => {
  const allCards = document.querySelectorAll(".column");

  allCards.forEach((card) => {
    const cardTitle = card.querySelector(".product-title").innerText.toLowerCase();
    card.style.display = cardTitle.includes(category.toLowerCase()) ? "block" : "none";
  });
}

async function fetchAndDisplayProducts() {
  try {
    const products = await getProducts();
    displayProducts(products);
  } catch (error) {
    console.error("An error has occurred:", error);
  }
}
fetchAndDisplayProducts();

