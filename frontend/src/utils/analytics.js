// Google Analytics Utility

// Helper to safely access gtag
const gtag = (...args) => {
    if (window.gtag) {
        window.gtag(...args);
    } else {
        console.warn("Google Analytics (gtag) not found.");
    }
};

export const trackViewItem = (product) => {
    gtag("event", "view_item", {
        currency: "INR",
        value: product.price,
        items: [
            {
                item_id: product._id,
                item_name: product.name,
                item_category: product.collection,
                price: product.price,
                quantity: 1
            }
        ]
    });
};

export const trackAddToCart = (product, size, quantity) => {
    gtag("event", "add_to_cart", {
        currency: "INR",
        value: product.price * quantity,
        items: [
            {
                item_id: product._id,
                item_name: product.name,
                item_variant: size,
                price: product.price,
                quantity: quantity
            }
        ]
    });
};

export const trackBeginCheckout = (cartItems, totalAmount) => {
    gtag("event", "begin_checkout", {
        currency: "INR",
        value: totalAmount,
        items: cartItems.map(item => ({
            item_id: item.productId,
            item_name: item.name, // Ensure name is passed or looked up
            item_variant: item.size,
            price: item.price,
            quantity: item.quantity
        }))
    });
};

export const trackPurchase = (orderId, amount, items) => {
    gtag("event", "purchase", {
        transaction_id: orderId,
        value: amount,
        currency: "INR",
        items: items.map(item => ({
            item_id: item._id,
            item_name: item.name,
            item_variant: item.size,
            price: item.price,
            quantity: item.quantity
        }))
    });
};
