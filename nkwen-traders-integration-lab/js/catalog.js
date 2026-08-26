import {
    loadProducts,
    getProductId,
    formatPrice
} from "./product.js";


// ================================
// PAGE ELEMENTS
// ================================

const productGrid =
    document.getElementById("product-grid");

const productCount =
    document.getElementById("product-count");

const searchInput =
    document.getElementById("product-search");

const categoryFilter =
    document.getElementById("category-filter");

const priceSort =
    document.getElementById("price-sort");

const emptyState =
    document.getElementById("empty-state");

const clearSearch =
    document.getElementById("clear-search");


// ================================
// PRODUCTS
// ================================

let products = [];


// ================================
// IMAGE NAME MAPPING
// ================================

const productImages = {

    "Bread (loaf)": "bread.jpeg",

    "Matches (box)": "matches.jpeg",

    "Palm Oil 5L": "palm-oil-5l.jpeg",

    "Beans (White)": "beans-white.jpeg",

    "Plantain (bunch)": "plantain.jpeg",

    "Beans (Red)": "beans-red.jpeg",

    "Maggi Cubes (pack)": "maggi-cubes.jpeg",

    "Tomato Paste (tin)": "tomato-paste.jpeg",

    "Soap (bar)": "soap.jpeg",

    "Onions 1kg": "onions.jpeg",

    "Vegetable Oil 5L": "vegetable-oil-5l.jpeg",

    "Salt 1kg": "salt.jpeg",

    "Cassava (bag)": "cassava.jpeg",

    "Sugar 1kg": "sugar.jpeg",

    "Rice 25kg": "rice-25kg.jpeg",

    "Rice 50kg": "rice-50kg.jpeg",

    "Detergent 1kg": "detergent.jpeg",

    "Palm Oil 1L": "palm-oil-1l.jpeg",

    "Milk Powder 400g": "milk-powder.jpeg",

    "Tomatoes 1kg": "tomatoes.jpeg"

};


// ================================
// GET PRODUCT IMAGE
// ================================

function getProductImage(productName) {

    return (
        productImages[productName] ||
        "default-product.jpeg"
    );
}


// ================================
// LOAD CATALOGUE
// ================================

async function startCatalogue() {

    try {

        products = await loadProducts();

        console.log("Products loaded:", products);

        populateCategories();

        displayProducts(products);

    } catch (error) {

        console.error(
            "Catalogue error:",
            error
        );

        productCount.textContent =
            "Unable to load products.";

        productGrid.innerHTML = `
            <div class="empty-state">

                <h2>
                    Products could not be loaded
                </h2>

                <p>
                    ${error.message}
                </p>

            </div>
        `;
    }
}


// ================================
// CATEGORY FILTER
// ================================

function populateCategories() {

    categoryFilter.innerHTML = `
        <option value="all">
            All categories
        </option>
    `;


    const categories = [
        ...new Set(
            products
                .map(product =>
                    product.category
                )
                .filter(Boolean)
        )
    ].sort();


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });
}


// ================================
// DISPLAY PRODUCTS
// ================================

function displayProducts(productList) {

    productGrid.innerHTML = "";


    productCount.textContent =
        `${productList.length} product${
            productList.length === 1
                ? ""
                : "s"
        } found`;


    if (productList.length === 0) {

        emptyState.classList.remove(
            "hidden"
        );

        return;
    }


    emptyState.classList.add(
        "hidden"
    );


    productList.forEach(product => {

        const id =
            getProductId(product);


        const name =
            product.name ||
            "Unnamed product";


        const category =
            product.category ||
            "Uncategorized";


        const price =
            product.price;


        const image =
            getProductImage(name);


        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="../images/products/${image}"
                    alt="${name}"
                    loading="lazy"
                >

            </div>


            <div class="product-content">

                <span class="product-category">
                    ${category}
                </span>


                <h2 class="product-name">
                    ${name}
                </h2>


                <p class="product-price">
                    ${formatPrice(price)}
                </p>


                <a
                    class="product-link"
                    href="product.html?id=${encodeURIComponent(id)}"
                >
                    View product →
                </a>

            </div>

        `;


        productGrid.appendChild(card);

    });
}


// ================================
// FILTER / SEARCH / SORT
// ================================

function updateCatalogue() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const sortOption =
        priceSort.value;


    let filteredProducts =
        products.filter(product => {

            const name =
                String(
                    product.name || ""
                ).toLowerCase();


            const category =
                String(
                    product.category || ""
                );


            const matchesSearch =
                name.includes(
                    searchTerm
                );


            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    // ================================
    // SORT LOW → HIGH
    // ================================

    if (
        sortOption === "low-high"
    ) {

        filteredProducts.sort(
            (a, b) =>
                Number(a.price || 0) -
                Number(b.price || 0)
        );

    }


    // ================================
    // SORT HIGH → LOW
    // ================================

    if (
        sortOption === "high-low"
    ) {

        filteredProducts.sort(
            (a, b) =>
                Number(b.price || 0) -
                Number(a.price || 0)
        );

    }


    displayProducts(
        filteredProducts
    );
}


// ================================
// CLEAR FILTERS
// ================================

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        categoryFilter.value =
            "all";

        priceSort.value =
            "default";

        updateCatalogue();

    }
);


// ================================
// SEARCH
// ================================

searchInput.addEventListener(
    "input",
    updateCatalogue
);


// ================================
// CATEGORY
// ================================

categoryFilter.addEventListener(
    "change",
    updateCatalogue
);


// ================================
// PRICE SORT
// ================================

priceSort.addEventListener(
    "change",
    updateCatalogue
);


// ================================
// START
// ================================

startCatalogue();