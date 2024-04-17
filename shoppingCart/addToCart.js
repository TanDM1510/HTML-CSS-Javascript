const retrievedShoeData = JSON.parse(localStorage.getItem("SHOESLIST"));

document.querySelectorAll(".card-icon").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.id);
  });
});
const keyLocalStorageItemCart = "ITEMCARTLIST";
const addToCart = (productId) => {
  const product = retrievedShoeData.find((item) => item.id === productId);
  console.log(product);

  let cart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];

  const existingProductIndex = cart.findIndex(
    (item) => item.product.id === productId
  );

  if (product.quantity === 0) {
    return alert("This product is out of stock!");
  }

  if (
    cart[existingProductIndex]?.quantity >=
    cart[existingProductIndex]?.product?.quantity
  ) {
    return alert("You can not add more of this product");
  }

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ quantity: 1, product });
  }
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cart));
  alert("Product added to cart!");
};
