import Header from "../components/Header";
import { shoeData } from "../utils/data";

export const HomePage = () => {
  const retrievedShoeData = JSON.parse(localStorage.getItem("SHOESLIST"));
  if (!retrievedShoeData || retrievedShoeData.length === 0) {
    localStorage.setItem("SHOESLIST", JSON.stringify(shoeData));
  }
  if (retrievedShoeData && retrievedShoeData.length > 0) {
    const contentHTML = retrievedShoeData
      .map((item) => {
        return `<div class="card" style="position:relative">
          <img src="${item.image}" class="card-img-top h-75 " alt="...">
          <div class="card-body">
            <p class="card-title">${item.shoesName}</p>
            <p class="card-description">
              <span class="description">$${item.price}</span>
               <span class="description">${
                 item.quantity === 0 ? "Sold out" : "Quantity: " + item.quantity
               }</span>
            </p>
          </div>
          <button class="card-icon" onclick='addToCart(${item.id})'">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>`;
      })
      .join("");

    return /*html*/ `
     ${Header()}
      <div class="container">
        <div class="items">
          ${contentHTML}
        </div>
      </div>
    `;
  } else {
    return /*html*/ `
      ${Header()}
    <div>No shoe data available please try to reload page to get the data.</div>`;
  }
};
