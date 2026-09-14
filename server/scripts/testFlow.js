const http = require("http");

function request(url, options = {}, data = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || "GET",
      headers: options.headers || {},
    };

    if (data) {
      reqOptions.headers["Content-Type"] = "application/json";
    }

    const req = http.request(reqOptions, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsedData });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on("error", reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log("=== STARTING FULL STACK PIZZARIO TEST SUITE ===");

  // 1. Customer Registration
  const userPayload = {
    name: "Aman Gupta",
    email: "aman" + Date.now() + "@example.com",
    password: "password123",
  };
  const regRes = await request("http://localhost:5000/api/auth/register", { method: "POST" }, userPayload);
  console.log("1. Customer Register:", regRes.status, "=> Success:", regRes.data?.success, "| Role:", regRes.data?.user?.role);
  const userToken = regRes.data?.token;

  // 2. Customer Login
  const loginRes = await request("http://localhost:5000/api/auth/login", { method: "POST" }, {
    email: userPayload.email,
    password: userPayload.password,
  });
  console.log("2. Customer Login:", loginRes.status, "=> Token Present:", Boolean(loginRes.data?.token));

  // 3. Customer trying to access Admin Login
  const invalidAdminLogin = await request("http://localhost:5000/api/admin/login", { method: "POST" }, {
    email: userPayload.email,
    password: userPayload.password,
  });
  console.log("3. Customer Admin Login Blocked:", invalidAdminLogin.status, "=> Message:", invalidAdminLogin.data?.message);

  // 4. Admin Login
  const adminLoginRes = await request("http://localhost:5000/api/admin/login", { method: "POST" }, {
    email: "admin@pizzario.com",
    password: "admin123",
  });
  console.log("4. Admin Login:", adminLoginRes.status, "=> Success:", adminLoginRes.data?.success, "| Role:", adminLoginRes.data?.user?.role);
  const adminToken = adminLoginRes.data?.token;

  // 5. Place Customer Order
  const orderPayload = {
    userName: "Aman Gupta",
    email: userPayload.email,
    phone: "+91 9988776655",
    deliveryAddress: "Apartment 5B, Skyline Towers, Mumbai",
    notes: "Please ring bell twice",
    orderedItems: [
      { pizzaId: "pizza_1", pizzaName: "Pepperoni Pizza", quantity: 2, size: "Medium", itemPrice: 14.99 },
      { pizzaId: "pizza_2", pizzaName: "Farmhouse Pizza", quantity: 1, size: "Large", itemPrice: 16.99 }
    ],
    subtotal: 46.97,
    deliveryFee: 3.99,
    tax: 4.70,
    totalAmount: 55.66,
    paymentMethod: "Cash on Delivery",
  };

  const orderRes = await request("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { Authorization: `Bearer ${userToken}` },
  }, orderPayload);
  const createdOrderId = orderRes.data?.order?.orderId;
  console.log("5. Place Order:", orderRes.status, "=> OrderId:", createdOrderId, "| Status:", orderRes.data?.order?.orderStatus);

  // 6. Customer My Orders
  const myOrdersRes = await request("http://localhost:5000/api/orders/my-orders", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  console.log("6. Customer My Orders:", myOrdersRes.status, "=> Orders Count:", myOrdersRes.data?.count, "| First Order ID:", myOrdersRes.data?.orders?.[0]?.orderId);

  // 7. Admin Orders Panel (Check immediate visibility)
  const adminOrdersRes = await request("http://localhost:5000/api/admin/orders", {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const foundInAdmin = adminOrdersRes.data?.orders?.some((o) => o.orderId === createdOrderId);
  console.log("7. Admin Orders List:", adminOrdersRes.status, "=> Total Orders:", adminOrdersRes.data?.count, "| Order Found Immediately in Admin:", foundInAdmin);

  // 8. Admin Status Update to "In Kitchen"
  const updateRes = await request(`http://localhost:5000/api/admin/orders/${createdOrderId}/status`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${adminToken}` },
  }, { orderStatus: "In Kitchen" });
  console.log("8. Admin Status Update:", updateRes.status, "=> New Status:", updateRes.data?.order?.orderStatus);

  // 9. Verify Live Order Tracker Status
  const trackRes = await request(`http://localhost:5000/api/orders/${createdOrderId}`);
  console.log("9. Live Order Tracker:", trackRes.status, "=> Updated Status:", trackRes.data?.order?.orderStatus);

  console.log("=== ALL TEST SUITE CHECKS COMPLETED ===");
}

runTests().catch(console.error);
