$(function() {
  let cartTotal = 0;
  let cartItems = [];

  const render = function(items) {
    $("#modal").modal("hide");
    $("#sale-items").empty();

    items.forEach(function(item) {
      $("#sale-items").append(buildItemRow(item));
    });
  };

  const getItems = function() {
    $.get("/api/product").then(render);
  };

  const buildItemRow = function(item) {
    const tr = $("<tr>");

    const input = $("<input>")
      .attr({
        type: "number",
        min: 0,
        id: item.id
      })
      .addClass("quantInput");

    const button = $("<button>")
      .addClass("myButtonCart add-to-cart btn btn-danger")
      .text("Add to Cart")
      .attr("data-id", item.id);

    tr.append(
      $("<td>").append(input),
      $("<td>").text(item.product_name),
      $("<td>").text(item.stock_quantity),
      $("<td>").text(`$${item.price}`),
      $("<td>").append(button)
    );
    return tr;
  };

  const addCartRow = function(qty, item) {
    const itemTotal = item[0].price * qty;
    cartTotal += itemTotal;
    item[0].stock_quantity -= qty;
    cartItems.push(item);
    const tr = $("<tr>").addClass(`cart-${item[0].id}`);
    tr.append(
      $(`<td>`).text(item[0].product_name),
      $(`<td>`).text(qty),
      $(`<td>`).text(`$${item[0].price}`),
      $(`<td>`).text(`$${itemTotal.toFixed(2)}`)
    );

    $("#cartList").append(tr);
    $("#cart-total").text(`$${cartTotal.toFixed(2)}`);
  };

  const messageModal = function(text) {
    console.log(text);
    $("#messageModalContent").text(text);
    $(".messageModal").modal("show");
    timeInterval = setTimeout(clearMessages, 3500);
  };

  const clearMessages = function() {
    $("#messages").empty();
  };

  const addItemToCart = function() {
    clearMessages();
    const id = $(this).attr("data-id");
    $.get(`/api/product/${id}`).then(updateCart);
  };

  const updateCart = function(data) {
    const numRequested = $(`#${data[0].id}`).val();
    if (numRequested <= 0) {
      messageModal("Please choose a valid quantity");
    } else if (numRequested > data[0].stock_quantity) {
      messageModal(
        `Sorry. There are only ${data[0].stock_quantity} left in stock`
      );
    } else {
      addCartRow(numRequested, data);
      messageModal("Item(s) have been added to cart!");
      $(`#${data.id}`).val("");
    }
  };

  const checkout = function() {
    cartItems.forEach(function(item) {
      console.log(item)
      $.ajax({
        method: "PUT",
        url: `/api/product/${item[0].id}`,
        data: item[0]
      });
    });
    
    cartItems = [];
  };

  getItems();

  $("#sale-items").on("click", ".add-to-cart", addItemToCart);
  $("#close").on("click", getItems);
  $("#purchase").on("click", checkout);
});
