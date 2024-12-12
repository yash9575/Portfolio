// Add event listener to navigation menu
document.addEventListener("DOMContentLoaded", function() {
    const navMenu = document.querySelector("nav ul");
    navMenu.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const sectionId = event.target.getAttribute("href");
            const section = document.querySelector(sectionId);
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Add event listener to scroll to top button
const scrollToTopButton = document.createElement("button");
scrollToTopButton.textContent = "Scroll to Top";
scrollToTopButton.style.position = "fixed";
scrollToTopButton.style.bottom = "20px";
scrollToTopButton.style.right = "20px";
scrollToTopButton.style.background-color = "#333";
scrollToTopButton.style.color = "#fff";
scrollToTopButton.style.border = "none";
scrollToTopButton.style.padding = "10px";
scrollToTopButton.style.cursor = "pointer";
document.body.appendChild(scrollToTopButton);
scrollToTopButton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});