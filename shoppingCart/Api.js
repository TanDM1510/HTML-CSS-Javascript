export async function province() {
  try {
    const response = await fetch("https://vapi.vnappmob.com/api/province/");
    const provinceData = await response.json();
    return provinceData;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu tỉnh thành:", error);
    throw error;
  }
}
export async function district(id) {
  try {
    const response = await fetch(
      `https://vapi.vnappmob.com/api/province/district/${id}`
    );
    const provinceData = await response.json();
    return provinceData;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu quận huyện:", error);
    throw error;
  }
}

export async function ward(id) {
  try {
    const response = await fetch(
      `https://vapi.vnappmob.com/api/province/ward/${id}`
    );
    const provinceData = await response.json();
    return provinceData;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu phường xã:", error);
    throw error;
  }
}

export async function bill() {
  try {
    const response = await fetch(
      "https://649a2c4879fbe9bcf840532c.mockapi.io/api/data/tan"
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function sendDeleteRequest(orderId) {
  const response = await fetch(
    `https://649a2c4879fbe9bcf840532c.mockapi.io/api/data/orderList/${orderId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete order");
  }
  console.log("Order deleted successfully");
}

export async function fetchOrderDetails(orderId) {
  const response = await fetch(
    `https://649a2c4879fbe9bcf840532c.mockapi.io/api/data/orderList/${orderId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }
  return await response.json();
}
