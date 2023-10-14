const mainRow = document.querySelector("#row");
const name = document.querySelector("#name").value;
const description = document.querySelector("#description").value;
const brand = document.querySelector("#brand").value;
const imageUrl = document.querySelector("#image").value;
const price = document.querySelector("#price").value;

async function getProducts() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFkYjJiNDUyYmJmMzAwMTg3OWIyNjkiLCJpYXQiOjE2OTY0NDgxNTUsImV4cCI6MTY5NzY1Nzc1NX0.sR_M_1Mlzvu3UIDmfFG3N8ec_vW7RO_hXF7MeXML2cY"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error;
    }
}

async function addProduct(event) {
    event.preventDefault();


    const product = {
        name,
        description,
        brand,
        imageUrl,
        price,
    };

    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFkYjJiNDUyYmJmMzAwMTg3OWIyNjkiLCJpYXQiOjE2OTY0NDgxNTUsImV4cCI6MTY5NzY1Nzc1NX0.sR_M_1Mlzvu3UIDmfFG3N8ec_vW7RO_hXF7MeXML2cY"
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            alert("Product added successfully");
            const data = await getProducts();
            displayProducts(data);
            clearFormFields();
        } else {
            console.error("Cannot send");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function displayProducts(data) {
    const productsHTML = data.map(({ _id, name, description, brand, imageUrl, price }) => `
            <div class="col-2 border border-1 mb-2 p-0"> <img src="${imageUrl}" alt="${description}" class="img-fluid" /> </div>
            <div class="col-2">${name}</div>
            <div class="col-2">${description}</div>
            <div class="col-2">${brand}</div>
            <div class="col-2">€${price}</div>
            <div class="col-2">
            <button class="border border-none" id="delete-button" onclick="handleDelete('${_id}')"> <i class="bi bi-trash3-fill text-color"></i>Delete</button>
            <button class="border border-none" onclick="handleEdit('${_id}')"><i class="bi bi-pencil-square text-color"></i> Edit </button>
            </div>
    `).join("");

    mainRow.innerHTML = productsHTML;
}

async function handleEdit(id) {
    const productData = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id)
    const productJson = await productData.json()

    const { name, description, brand, imageUrl, price } = productJson

    const productDataRow = document.querySelector(`#${_id}`)

    productDataRow.innerHTML = /*html*/`
    <form class="d-flex flex-column" id="form" onsubmit="handleEditSubmit(event,'${_id}')">
    <div class="row mb-3">
        <!-- 1st Column -->
        <div class="col-6">
            <label for="name">Name</label>
            <input required id="name" type="text" class="form-control" placeholder="Karin Sofa" value="${name}">
        </div>
        <div class="col-6">
            <label for="description">Description</label>
            <input required id="description" type="text" class="form-control" placeholder="2 seater sofa" value="${description}">
        </div>
    </div>
    <div class="row mb-3">
        <!-- 2nd Column -->
        <div class="col-6">
            <label for="brand">Brand</label>
            <input required id="brand" type="text" class="form-control" placeholder="Agape" value="${brand}">
        </div>
        <div class="col-6">
            <label for="image">Image URL</label>
            <input required id="image"type="text" class="form-control" placeholder="https://ibb.co/yNYC0rk" value="${imageUrl}">
        </div>
    </div>
    <div class="row mb-3">
        <!-- 3rd Column -->
        <div class="col-6">
            <label for="price">Price</label>
            <div class="d-flex align-items-center">
                <span class="me-2 text-color"> € </span>
                <input required id="price" type="text" class="form-control" placeholder="900" value="${price}">
            </div>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-around mt-3">
            <button class="btn-light border-0 rounded p-2 mt-2 "type="button" onclick="handleEditCancel()"> <i class="bi bi-x-square-fill"></i></button>
        </div>
    </div>
</form>
`
}

async function handleEditSubmit(e, id) {
    e.preventDefault();
    e.target.classList.add("pe-none")
    e.target.querySelector("button[type=submit]").innerHTML = /*html*/ `
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    const name = form.querySelector("#name");
    const description = form.querySelector("#description");
    const brand = form.querySelector("#brand");
    const imageUrl = form.querySelector("#image");
    const price = form.querySelector("#price");

    const updatedProduct = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imageUrl.value,
        price: price.value,
    };

    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFkYjJiNDUyYmJmMzAwMTg3OWIyNjkiLCJpYXQiOjE2OTY0NDgxNTUsImV4cCI6MTY5NzY1Nzc1NX0.sR_M_1Mlzvu3UIDmfFG3N8ec_vW7RO_hXF7MeXML2cY"
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            displayProducts(await getProducts());
        } else {
            alert("Something went wrong.");
        }
    } catch {
        alert("You are offline.");
    }
}

async function handleDelete(id) {

    if (!confirm("Are you sure you want to delete this product?")) {
        return
    }

    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFkYjJiNDUyYmJmMzAwMTg3OWIyNjkiLCJpYXQiOjE2OTY0NDgxNTUsImV4cCI6MTY5NzY1Nzc1NX0.sR_M_1Mlzvu3UIDmfFG3N8ec_vW7RO_hXF7MeXML2cY"
        }
    })

    if (response.ok) {
        alert("Product successfully deleted!")
        displayProducts(await getProducts())
    } else {
        alert("Can't delete this product.")
    }
}

window.onload = async function () {
    try {
        const productData = await getProducts();
        displayProducts(productData);
    } catch (error) {
        console.log(error);
    }
};





