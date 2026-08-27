
let allProducts = []; // keep the full list so we can filter without re-fetching

fetch('products.json')
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    renderProducts(allProducts);
  })
  .catch(err => console.error('Error loading products:', err));

function renderProducts(products) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = ''; // clear previous results before rendering new ones

  if (products.length === 0) {
    container.innerHTML = '<p>No products found in this category.</p>';
    return;
  }

  products.forEach(product => {
    const imgPath = `assets/${product.image}`;

    const card = document.createElement('div');
    card.classList.add('product-card');

    let cardHTML = `<img src="${imgPath}" alt="${product.name}">`;

    for (const [key, value] of Object.entries(product)) {
      if (key === 'image') continue;
      cardHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    }

    card.innerHTML = cardHTML;
    container.appendChild(card);
  });
}

function searchByCategory(category) {
  const filtered = allProducts.filter(product =>
    product.category.toLowerCase() === category.toLowerCase()
  );
  renderProducts(filtered);
}