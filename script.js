document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll for nav
    const navMenu = document.querySelector("nav ul");
    navMenu.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const sectionId = event.target.getAttribute("href");
            const section = document.querySelector(sectionId);
            section.scrollIntoView({ behavior: "smooth" });

            // Close mobile menu after click
            navMenu.classList.remove("show");
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });

    // Scroll to top button
    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.textContent = "↑";
    scrollToTopButton.className = "scroll-to-top";
    document.body.appendChild(scrollToTopButton);

    window.addEventListener("scroll", function () {
        scrollToTopButton.classList.toggle("show", window.scrollY > 300);
    });

    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
