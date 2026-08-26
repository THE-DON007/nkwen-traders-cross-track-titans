import {
    loadProducts,
    findProduct,
    getProductId,
    formatPrice
} from "./product.js";


// ========================================
// PAGE ELEMENTS
// ========================================

const productDetails =
    document.getElementById("product-details");

const productNotFound =
    document.getElementById("product-not-found");


// ========================================
// PRODUCT IMAGE MAP
// ========================================

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


// ========================================
// GET PRODUCT IMAGE
// ========================================

function getProductImage(productName) {

    return (
        productImages[productName] ||
        "default-product.jpeg"
    );
}


// ========================================
// GET PRODUCT ID FROM URL
// ========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    params.get("id");


// ========================================
// LOAD PRODUCT DETAILS
// ========================================

async function loadProductDetails() {

    try {

        if (!productId) {
            showNotFound();
            return;
        }

        const products =
            await loadProducts();

        const product =
            findProduct(
                products,
                productId
            );

        if (!product) {
            showNotFound();
            return;
        }

        displayProduct(product);

    } catch (error) {

        console.error(
            "Product details error:",
            error
        );

        showNotFound();
    }
}


// ========================================
// DISPLAY PRODUCT
// ========================================

function displayProduct(product) {

    const name =
        product.Product ??
        product.name ??
        "Unnamed product";


    const category =
        product.Category ??
        product.category ??
        "Uncategorized";


    const price =
        product.UnitPrice_FCFA ??
        product.price ??
        0;


    const quantity =
        product.Quantity ??
        product.quantity ??
        "N/A";


    const id =
        getProductId(product) ??
        "N/A";


    const unit =
        product.unit ??
        product.sellingUnit ??
        "1 unit";


    const description =
        product.description ??
        `Quality ${name.toLowerCase()} available from Nkwen Traders.`;


    const image =
        getProductImage(name);


    productDetails.innerHTML = `

        <article class="product-detail-card">

            <!-- PRODUCT IMAGE -->

            <div class="product-detail-image">

                <img
                    src="../images/products/${image}"
                    alt="${name}"
                >

            </div>


            <!-- PRODUCT INFORMATION -->

            <div class="product-detail-content">

                <p class="product-category">
                    ${category}
                </p>


                <h1>
                    ${name}
                </h1>


                <p class="product-price">
                    ${formatPrice(price)}
                </p>


                <!-- SELLING UNIT -->

                <div class="product-unit">

                    <strong>
                        Sold as:
                    </strong>

                    <span>
                        ${unit}
                    </span>

                </div>


                <!-- DESCRIPTION -->

                <div class="product-description">

                    <h2>
                        About this product
                    </h2>

                    <p>
                        ${description}
                    </p>

                </div>


                <!-- PRODUCT INFORMATION -->

                <div class="product-information">

                    <p>

                        <strong>
                            Category:
                        </strong>

                        ${category}

                    </p>


                    <p>

                        <strong>
                            Available quantity:
                        </strong>

                        ${quantity}

                    </p>


                    <p>

                        <strong>
                            Product ID:
                        </strong>

                        ${id}

                    </p>

                </div>


                <!-- BACK BUTTON -->

                <a
                    class="button button-primary"
                    href="products.html"
                >
                    Back to catalogue
                </a>

            </div>

        </article>

    `;
}


// ========================================
// PRODUCT NOT FOUND
// ========================================

function showNotFound() {

    productDetails.innerHTML = "";

    productNotFound.classList.remove(
        "hidden"
    );
}


// ========================================
// START
// ========================================

loadProductDetails();