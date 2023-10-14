const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFkYjJiNDUyYmJmMzAwMTg3OWIyNjkiLCJpYXQiOjE2OTY0NDgxNTUsImV4cCI6MTY5NzY1Nzc1NX0.sR_M_1Mlzvu3UIDmfFG3N8ec_vW7RO_hXF7MeXML2cY"
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