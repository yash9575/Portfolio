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

    // Scroll to top button
    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.textContent = "Scroll to Top";
    scrollToTopButton.className = "scroll-to-top";
    document.body.appendChild(scrollToTopButton);

    window.addEventListener("scroll", function() {
        scrollToTopButton.classList.toggle("show", window.scrollY > 300);
    });

    scrollToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("https://api.github.com/repos/yash9575/portfolio/contents/submissions.json", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            let content = [];
            if (response.ok) {
                const data = await response.json();
                content = JSON.parse(atob(data.content));
            }

            content.push({ name, email, message, timestamp: new Date().toISOString() });

            await fetch("https://api.github.com/repos/yash9575/portfolio/contents/submissions.json", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github.v3+json"
                },
                body: JSON.stringify({
                    message: `Add submission from ${name}`,
                    content: btoa(JSON.stringify(content, null, 2)),
                    sha: response.ok ? (await response.json()).sha : undefined
                })
            });

            alert("Message sent successfully!");
            contactForm.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to send message. Please try again later.");
        }
    });
});
