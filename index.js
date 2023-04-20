let products = [];

// Function to make HTTP request
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/');
        const data = await response.json();
        products = data;
        return products;
    } catch (error) {
        console.log(error);
    }
}

// Function to render product titles
function renderProductTitles() {
    const ul = document.createElement('ul');
    products.forEach((product) => {
        const li = document.createElement('li');
        const spanTitle = document.createElement('span');
        spanTitle.innerText = product.title;
        const spanPrice = document.createElement('span');
        spanPrice.innerText = product.price;
        spanPrice.style.color = "red";
        li.appendChild(spanTitle);
        li.appendChild(spanPrice);
        li.addEventListener('click', () => {
            renderProductDetails(product.id);
        });
        ul.appendChild(li);
    });
    document.body.appendChild(ul);
}

// Function to calculate sum of all products and render it on screen
function renderTotal() {
    const total = products.reduce((acc, product) => {
        return acc + product.price;
    }, 0);
    const p = document.createElement('p');
    p.innerText = `Total: $${total.toFixed(2)}`;
    document.body.appendChild(p);
}

// Function to find highest rated product
function findHighestRated() {
    let highestRated = products[0];
    products.forEach((product) => {
        if (product.rating > highestRated.rating) {
            highestRated = product;
        }
    });
    return highestRated;
}

// Function to render product details
async function renderProductDetails(id) {
    const product = await fetch(`https://fakestoreapi.com/products/${id}`).then((response) => response.json());
    const div = document.createElement('div');
    div.innerHTML = `
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <p>Price: $${product.price.toFixed(2)}</p>
    <img src="${product.image}" alt="${product.title}" />
  `;
    document.body.appendChild(div);
}

// Function to clean up DOM and re-render product titles
function renderProducts() {
    document.body.innerHTML = '';
    renderProductTitles();
    renderTotal();
}


// Function to search for a product by ID and render its details
function searchProductById() {
    console.log("tekst")
    const idInput = document.getElementById('id-input');
    const id = idInput.value;
    const product = products.find((product) => product.id === parseInt(id));
    if (product) {
        renderProductDetails(product.id);
        console.log(product.id)
    } else {
        const p = document.createElement('p');
        p.innerText = 'Product not found';
        document.body.appendChild(p);
    }
}

// Call fetchProducts function to get products from API and render them on screen
fetchProducts().then(() => {
    renderProductTitles();
    renderTotal();
});


// Bonus: Add button to re-render product titles
const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', () => {
    renderProducts();
});