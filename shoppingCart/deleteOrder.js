async function sendDeleteRequest(orderId) {
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
function updateInventory(shoesList, deletedOrder) {
  deletedOrder.products.forEach((cartItem) => {
    const product = shoesList.find((item) => item.id === cartItem.product.id);
    if (product) {
      product.quantity += cartItem.quantity;
    }
  });
  localStorage.setItem("SHOESLIST", JSON.stringify(shoesList));
  console.log("Shoe inventory updated successfully");
}

async function deleteOrder(orderId) {
  try {
    let shoesList = JSON.parse(localStorage.getItem("SHOESLIST")) || [];
    const shoesResponse = await fetch(
      `https://649a2c4879fbe9bcf840532c.mockapi.io/api/data/orderList/${orderId}`
    );
    const deletedOrder = await shoesResponse.json();
    updateInventory(shoesList, deletedOrder);
    await sendDeleteRequest(orderId);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}
