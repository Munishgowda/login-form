// Handle login form submission
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful!");
        window.location.href = "/dashboard.html"; // Redirect to the dashboard
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

// Handle signup form submission
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful! You can now log in.");
        window.location.href = "/"; // Redirect to login page
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

// Fetch and display shopping data on the dashboard
async function loadShoppingData() {
  try {
    const response = await fetch("/shopping-data");
    const data = await response.json();

    const tableBody = document.getElementById("shoppingData");
    if (tableBody) {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.item}</td>
          <td>${item.price}</td>
          <td>${item.category}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error loading shopping data:", error);
    alert("Failed to load shopping data. Please try again later.");
  }
}

// Load shopping data only if on the dashboard page
if (window.location.pathname === "/dashboard.html") {
  loadShoppingData();
}
