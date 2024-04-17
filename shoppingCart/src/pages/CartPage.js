import { district, province, ward } from "../../Api";
import Header from "../components/Header";

const CartPage = () => {
  async function fetchProvincesAndPopulateDropdown() {
    try {
      const provincesData = await province();
      const dropdownMenu = document.getElementById("provinceDropdown");
      const dropdown = document.getElementById("dropdownProvince");
      dropdownMenu.innerHTML = "";
      provincesData.results.forEach((province) => {
        const option = document.createElement("li");
        option.classList.add("dropdown-item");
        option.textContent = province.province_name;
        option.dataset.provinceId = province.province_id;
        dropdownMenu.appendChild(option);
        option.addEventListener("click", () => {
          const selectedProvinceId = option.dataset.provinceId;
          dropdown.textContent = province.province_name;
          getDistrictsAndPopulateDropdown(selectedProvinceId);
        });
      });
    } catch (error) {
      console.error("Error fetching provinces data:", error);
    }
  }

  async function getDistrictsAndPopulateDropdown(provinceId) {
    try {
      const districtsData = await district(provinceId);
      const dropdown = document.getElementById("dropdownDistrict");
      const dropdownMenu = document.getElementById("districtDropdown");
      dropdownMenu.innerHTML = "";
      districtsData.results.forEach((district) => {
        const option = document.createElement("li");
        option.classList.add("dropdown-item");
        option.textContent = district.district_name;
        option.dataset.districtId = district.district_id;
        dropdownMenu.appendChild(option);
        option.addEventListener("click", () => {
          dropdown.textContent = district.district_name;
          const selectedDistrictId = option.dataset.districtId;
          getWardsAndPopulateDropdown(selectedDistrictId);
        });
      });
    } catch (error) {
      console.error("Error fetching districts data:", error);
    }
  }

  async function getWardsAndPopulateDropdown(districtId) {
    try {
      const wardsData = await ward(districtId);
      const dropdown = document.getElementById("dropdownWard");
      const dropdownMenu = document.getElementById("wardDropdown");
      dropdownMenu.innerHTML = "";
      wardsData.results.forEach((ward) => {
        const option = document.createElement("li");
        option.classList.add("dropdown-item");
        option.textContent = ward.ward_name;
        option.dataset.wardId = ward.ward_id;
        dropdownMenu.appendChild(option);
        option.addEventListener("click", () => {
          dropdown.textContent = ward.ward_name;
          console.log("Selected Ward ID:", option.dataset.wardId);
        });
      });
    } catch (error) {
      console.error("Error fetching wards data:", error);
    }
  }

  fetchProvincesAndPopulateDropdown();

  const keyLocalStorageItemCart = "ITEMCARTLIST";
  const cardItem = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
  const totalAmount = cardItem?.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  const contentHTML = cardItem
    ?.map((item) => {
      return `<div>
      <tr>
          <td class='w-25'><img src="${
            item.product.image
          }" class="img-fluid img-thumbnail w-50 " style="height:100px; "></td>
      <th scope="row">  ${item.product.shoesName}</th>
  
      <td>${item.quantity}</td>
      <td>$${item.product.price}</td>
      <td>$${item.product.price * item.quantity}</td>
       <td ><div class='clear' onclick='clearItem(${
         item.product.id
       })'><i class="fa-solid fa-trash" style="color:red;cursor:pointer"></i></div></td>
    </tr>
    </div>`;
    })
    .join("");

  if (cardItem?.length === 0 || !cardItem) {
    return `
     ${Header()}
    <div class="container">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th></th>
      <th scope="col">Quantity</th>
      <th scope="col">Subtotal</th>
      <th scope="col">Total</th>
          <th scope="col">Clear Cart</th>
    </tr>
  </thead>
  <tbody>
<tr><td colspan="7">Card Empty</td></tr>
      </tbody>
      
</table>
      <button class='btn btn-danger '><a class='link' href="/">Back to shopping</a> </button>
      </div>`;
  } else
    return `
   ${Header()}
   <div aria-live="polite" aria-atomic="true" class="toast-container position-absolute top-0 end-0 p-3">
  <div id="myToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
    <div class="toast-header">
      <strong class="me-auto">Thông báo</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" id="toastBody"></div>
  </div>
</div>
   <div class="container"><table class="table">
  <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th></th>
      <th scope="col">Quantity</th>
      <th scope="col">Subtotal</th>
      <th scope="col">Total</th>
          <th scope="col">Clear Cart</th>
    </tr>
  </thead>
  <tbody>
    ${contentHTML}
  </tbody>
</table>
   <div class='card-footer'>
   <button class='btn btn-danger '><a class='link' href="/">Back to shopping</a> </button>
   <div class="total"><span>Total : $${totalAmount}</span>
 
   <button type="button" class="btn btn-success  " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Buy</button>
   </div>
   <div class="modal fade w-100" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" >
    <div class="modal-content" style="w-100" >
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin người mua</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="fullName" class="col-form-label">Họ và tên</label>
            <div class="modal-input">
              <input type="text" class="form-control" placeholder="Họ" id="firstName">
              <input placeholder="Tên" type="text" class="form-control" id="lastName">
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="col-form-label">Email</label>
            <input placeholder="Email" type="text" class="form-control" id="email">
          </div>
          <div class="mb-3">
            <label for="phone" class="col-form-label">Số điện thoại</label>
            <input placeholder="Số điện thoại" type="number" class="form-control" id="phone">
          </div>
          <div class="mb-3">
            <label for="address" class="col-form-label">Địa chỉ</label>
            <div class="modal-input">
              <div class="dropdown">
                <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownProvince" data-bs-toggle="dropdown" aria-expanded="false">
                  Tỉnh/Thành phố
                </a>
                <ul class="dropdown-menu" id="provinceDropdown">
                  
                </ul>
              </div>
              <div class="dropdown">
                <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownDistrict" data-bs-toggle="dropdown" aria-expanded="false">
                 Quận/Huyện
                </a>
                <ul class="dropdown-menu " id="districtDropdown">
                  
                </ul>
              </div>
              <div class="dropdown">
                <a class="btn  dropdown-toggle" href="#" id="dropdownWard" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Phường/Xã
                </a>
                <ul class="dropdown-menu" id="wardDropdown">
                  
                </ul>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="homeAddress" class="col-form-label">Số nhà</label>
            <input placeholder="số nhà" type="text" class="form-control" id="homeAddress">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Lời nhắn</label>
            <textarea class="form-control"  id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger " data-bs-dismiss="modal">Close</button>
         <button class="btn btn-success " onclick='clearCart()'>Confirm</button></div>
      </div>
    </div>
  </div>
</div>

   </div>`;
};

export default CartPage;
