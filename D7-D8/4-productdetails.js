const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM2OWU5NTc3Mzc1NTAwMTgzMjNhYzMiLCJpYXQiOjE2OTgwNzgzNTcsImV4cCI6MTY5OTI4Nzk1N30.icxaxpm-VBV6t0p5AQ6glBDhYPBXbEMhuRXZ9KkprGo"
    }
})
    .then(response => response.json())
    .then(displayProduct);

const productName = document.querySelector("#productName");
const productImage = document.querySelector("#productImage");
const productPrice = document.querySelector("#productPrice");
const productDescription = document.querySelector("#productDescription");
function displayProduct(product) {
    productName.innerHTML = product.name;
    productImage.src = product.imageUrl;
    productPrice.innerHTML = `€${product.price}`;
    productDescription.innerHTML = product.description;
}