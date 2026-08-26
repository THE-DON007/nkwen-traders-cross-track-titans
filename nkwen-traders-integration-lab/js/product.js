
const PRODUCTS_URL = "../data/products.json";


// ========================================
// LOAD ALL PRODUCTS
// ========================================

export async function loadProducts() {

    const response = await fetch(PRODUCTS_URL);

    if (!response.ok) {
        throw new Error(
            `Unable to load products.json (${response.status})`
        );
    }

    const products = await response.json();

    if (!Array.isArray(products)) {
        throw new Error(
            "products.json must contain an array."
        );
    }

    return products;
}


// ========================================
// GET PRODUCT ID
// ========================================

export function getProductId(product) {

    return product.id;
}


// ========================================
// FIND PRODUCT BY ID
// ========================================

export function findProduct(products, id) {

    return products.find(
        product =>
            String(product.id) === String(id)
    );
}


// ========================================
// FORMAT PRICE
// ========================================

export function formatPrice(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "Price unavailable";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
        return "Price unavailable";
    }

    return `${number.toLocaleString("fr-FR")} FCFA`;
}

