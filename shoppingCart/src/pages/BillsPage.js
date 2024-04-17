import { bill } from "../../Api";
import Header from "../components/Header";

const BillsPage = () => {
  let externalData = [];
  async function fetchData() {
    try {
      const newData = await bill();
      externalData = newData;
      renderContent();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function renderContent() {
    const tableBody = document.getElementById("billsTableBody");
    let contentHTML = "";
    if (externalData && externalData.length > 0) {
      contentHTML = externalData
        .map((item) => {
          const totalQuantity = item.products.reduce(
            (acc, curr) => acc + curr.quantity,
            0
          );
          const totalPrice = item.products.reduce(
            (acc, curr) => acc + curr.quantity * curr.product.price,
            0
          );
          const formattedDate = formatDate(item.createdAt);

          return `
            <tr>
              <th scope="row">${item.id}</th>
              <td style='display:grid;grid-template-column:auto'>
                ${item.fullName} <a href='/'>detail</a>
              </td>
              <td>${formattedDate}</td>
              <td>${item.products.length}</td>
              <td>${totalQuantity}</td>
              <td>$${totalPrice}</td>
              <td>
                <div onclick="deleteOrder(${item.id})">
                  <i class="fa-solid fa-trash" style="color:red;cursor:pointer"></i>
                </div>
              </td>
            </tr>
          `;
        })
        .join("");
    } else {
      contentHTML = `<tr><td colspan="7">No order</td></tr>`;
    }
    tableBody.innerHTML = contentHTML;
  }
  fetchData();
  return `
    ${Header()}
    <div class='container'>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Date</th>
            <th scope="col">Item Number</th>
            <th scope="col">Total quantity</th>
            <th scope="col">Total price</th>
            <th scope="col">Return</th>
          </tr>
        </thead>
        <tbody id="billsTableBody"></tbody>
      </table>
      <button class='btn btn-danger'>
        <a class='link' href="/">Back to shopping</a>
      </button>
    </div>
  `;
};

export default BillsPage;
