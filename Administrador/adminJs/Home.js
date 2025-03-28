document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Navigation Interactivity
  const sidebarItems = document.querySelectorAll(".sidebar nav ul li");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      sidebarItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      item.classList.add("active");
    });
  });

  // Optional: Add hover effects and animations
  const statCards = document.querySelectorAll(".stat-card");

  statCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
    });
  });
});
