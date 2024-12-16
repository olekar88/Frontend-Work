

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        section.classList.toggle('hidden', section.id !== sectionId);
    });
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            if (data.success) {
                showSection('prediction');
                document.getElementById('navLogout').style.display = 'block';
                document.getElementById('profile').style.display = 'inline'; // Show logged-in status
            }
        })
        .catch((error) => console.error('Error:', error));
});

//login





// Register form submission
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            if (data.success) {
                showSection('login');
            }
        })
        .catch((error) => console.error('Error:', error));
});

// Prediction
function predictFromImage() {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', imageInput.files[0]);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    document.getElementById('predictionResult').innerText = `Prediction: ${data.prediction}`;
                }
            })
            .catch((error) => console.error('Error:', error));
    } else {
        alert('Please upload an image.');
    }
}

// Navigation controls
document.getElementById('navLogin').addEventListener('click', () => showSection('login'));
document.getElementById('home').addEventListener('click', () => showSection('home'));
document.getElementById('schemes').addEventListener('click', () => showSection('schemes'));


document.getElementById('navRegister').addEventListener('click', () => showSection('register'));
document.getElementById('navPrediction').addEventListener('click', () => showSection('prediction'));
document.getElementById('navHospitals').addEventListener('click', () => showSection('hospitals'));
document.getElementById('navSchemes').addEventListener('click', () => showSection('schemes'));
document.getElementById('navLogout').addEventListener('click', () => {
    fetch('http://127.0.0.1:5000/api/logout', { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            if (data.success) {
                showSection('login');
                document.getElementById('navLogout').style.display = 'none';
                document.getElementById('profile').style.display = 'none'; // Hide logged-in status
            }
        });
});

// Initialize Google Maps for Nearby Hospitals
function initMap() {
    const map = new google.maps.Map(document.getElementById('hospitalMap'), {
        center: { lat: 40.7128, lng: -74.0060 }, // Example location (New York)
        zoom: 12,
    });

    const marker = new google.maps.Marker({
        position: { lat: 40.7128, lng: -74.0060 },
        map: map,
        title: 'Nearby Hospital 1',
    });

    // Add more markers as needed for other hospitals
}

