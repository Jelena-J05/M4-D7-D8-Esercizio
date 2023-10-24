const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4Mjg0ODc3Y2RhYTAwMTQ2ZGYzOTQiLCJpYXQiOjE2OTgxODAzMDAsImV4cCI6MTY5OTM4OTkwMH0.V-dy8WyqT6In9AMCUPq886_6SuWfe4s3VTsc9vQ_dSY"
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