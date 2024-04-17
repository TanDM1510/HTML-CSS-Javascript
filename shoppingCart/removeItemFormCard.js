const clearItem = (productId) => {
  let cart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];
  const existingProductIndex = cart.filter(
    (item) => item.product.id !== productId
  );
  localStorage.setItem(
    keyLocalStorageItemCart,
    JSON.stringify(existingProductIndex)
  );
  alert("Shoes has been removed from cart!");
  window.location.reload();
};
const cartItem = JSON.parse(localStorage.getItem("ITEMCARTLIST"));
const shoesList = JSON.parse(localStorage.getItem("SHOESLIST"));
const validateForm = () => {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const homeAddress = document.getElementById("homeAddress").value.trim();
  const message = document.getElementById("message-text").value.trim();
  const selectedProvince = document
    .getElementById("dropdownProvince")
    .textContent.trim();
  const selectedDistrict = document
    .getElementById("dropdownDistrict")
    .textContent.trim();
  const selectedWard = document
    .getElementById("dropdownWard")
    .textContent.trim();
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => {
    element.classList.remove("error");
  });

  if (firstName === "") {
    alertAndHighlight("Vui lòng nhập Họ.", "firstName");
    return false;
  }

  if (lastName === "") {
    alertAndHighlight("Vui lòng nhập Tên.", "lastName");
    return false;
  }

  if (email === "") {
    alertAndHighlight("Vui lòng nhập Email.", "email");
    return false;
  }

  if (phone === "") {
    alertAndHighlight("Vui lòng nhập Số điện thoại.", "phone");
    return false;
  }

  if (homeAddress === "") {
    alertAndHighlight("Vui lòng nhập Địa chỉ.", "homeAddress");
    return false;
  }
  if (selectedProvince === "Tỉnh/Thành phố") {
    alertAndHighlight("Vui lòng chọn Tỉnh/Thành phố.");
    return false;
  }

  if (selectedDistrict === "Quận/Huyện") {
    alertAndHighlight("Vui lòng chọn Quận/Huyện.");
    return false;
  }

  if (selectedWard === "Phường/Xã") {
    alertAndHighlight("Vui lòng chọn Phường/Xã.");
    return false;
  }
  const cartItems = JSON.parse(localStorage.getItem("ITEMCARTLIST"));
  if (cartItems) {
    cartItems.forEach((cartItem) => {
      const product = shoesList.find((item) => item.id === cartItem.product.id);
      if (product) {
        product.quantity -= cartItem.quantity;
      }
    });
    localStorage.setItem("SHOESLIST", JSON.stringify(shoesList));
  }
  const fullName = firstName + " " + lastName;
  const address =
    homeAddress +
    ", " +
    selectedProvince +
    ", " +
    selectedDistrict +
    ", " +
    selectedWard;

  const formData = {
    fullName: fullName,
    email: email,
    phone: phone,
    address: address,
    products: cartItem,
    message: message,
  };

  fetch("https://649a2c4879fbe9bcf840532c.mockapi.io/api/data/orderList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi dữ liệu.");
      }
      localStorage.removeItem(keyLocalStorageItemCart);
      alertAndHighlight("Buy success");
      window.location.reload();
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return true;
};

const alertAndHighlight = (message, inputId) => {
  const toastBody = document.getElementById("toastBody");
  toastBody.textContent = message;
  const myToast = new bootstrap.Toast(document.getElementById("myToast"));
  myToast.show();
};

const clearCart = () => {
  validateForm();
};
