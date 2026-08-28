
import {
    loadProducts,
    formatPrice
} from "./product.js";


// ============================================================
// NKWEN TRADERS — HOMEPAGE
// ============================================================


// ============================================================
// PAGE ELEMENTS
// ============================================================

const categoryGrid =
    document.querySelector("[data-category-grid]");

const featuredProducts =
    document.querySelector("[data-featured-products]");


// ============================================================
// PRODUCT IMAGE MAP
// ============================================================

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


// ============================================================
// GET PRODUCT IMAGE
// ============================================================

function getProductImage(productName) {

    return (
        productImages[productName] ||
        "default-product.jpeg"
    );

}


// ============================================================
// LOAD HOMEPAGE
// ============================================================

async function loadHomepage() {

    try {

        const products =
            await loadProducts();

        renderCategories(products);

        renderFeaturedProducts(products);

    } catch (error) {

        console.error(
            "Homepage loading error:",
            error
        );

    }

}


// ============================================================
// RENDER CATEGORIES
// ============================================================

function renderCategories(products) {

    if (!categoryGrid) {
        return;
    }


    const categories = [
        ...new Set(
            products.map(product =>
                product.category
            )
        )
    ];


    categoryGrid.innerHTML =
        categories.map(category => {

            const count =
                products.filter(
                    product =>
                        product.category === category
                ).length;


            return `

                <a
                    class="category-card"
                    href="pages/catalog.html"
                >

                    <h3>
                        ${category}
                    </h3>

                    <p>
                        ${count}
                        ${count === 1 ? "product" : "products"}
                        available
                    </p>

                </a>

            `;

        }).join("");

}


// ============================================================
// RENDER FEATURED PRODUCTS
// ============================================================

function renderFeaturedProducts(products) {

    if (!featuredProducts) {
        return;
    }


    /*
        Show the first six products
        from the catalogue.
    */

    const selectedProducts =
        products.slice(0, 6);


    featuredProducts.innerHTML =
        selectedProducts.map(product => {

            const name =
                product.name ??
                "Unnamed product";


            const category =
                product.category ??
                "Uncategorized";


            const price =
                product.price ??
                0;


            const image =
                getProductImage(name);


            return `

                <article class="product-card">

                    <div class="product-image">

                        <img
                            src="assets/products/${image}"
                            alt="${name}"
                            loading="lazy"
                        >

                    </div>


                    <div class="product-content">

                        <span class="product-category">
                            ${category}
                        </span>


                        <h3 class="product-name">
                            ${name}
                        </h3>


                        <p class="product-price">
                            ${formatPrice(price)}
                        </p>


                        <a
                            class="product-link"
                            href="pages/product.html?id=${encodeURIComponent(product.id)}"
                        >
                            View product →
                        </a>

                    </div>

                </article>

            `;

        }).join("");

}


// ============================================================
// START HOMEPAGE
// ============================================================

loadHomepage();
