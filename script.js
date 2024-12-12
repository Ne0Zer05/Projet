document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Empêche le rechargement de la page

    // Récupère les données du formulaire
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    // Vérifie si les champs sont remplis avant d'envoyer
    if (!email || !password) {
        alert("Les champs email et mot de passe doivent être remplis.");
        return;
    }

    // Envoie des données au serveur via fetch (requête POST)
    fetch('https://node-server-uara.onrender.com', {  // Remplace cette URL par celle de ton serveur Render
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })  // Envoie des identifiants en JSON
    })
    .then(response => response.json())  // Attend la réponse sous forme de JSON
    .then(data => {
        console.log('Réponse du serveur:', data);  // Affiche la réponse du serveur dans la console
        if (data.message) {
            alert(data.message);  // Affiche un message de succès ou autre réponse du serveur
        }
    })
    .catch((error) => {
        console.error('Erreur:', error);  // Affiche une erreur si la requête échoue
    });
});

// Gérer la validation des champs (email et mot de passe)
let inputTouched = {
    email: false,
    password: false
};

const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const warningEmail = document.getElementById("warningEmail");
const warningPassword = document.getElementById("warningPassword");

const inputOnBlur = (ev) => {
    if (inputTouched.email) {
        if (!validateEmail(inputEmail.value) && !validatePhone(inputEmail.value)) {
            warningEmail.style.display = "block";
            inputEmail.style.borderBottom = '2px solid #e87c03';
        } else {
            warningEmail.style.display = "none";
            inputEmail.style.borderBottom = "none";
        }
    }
    if (inputTouched.password) {
        if (!(inputPassword.value.length >= 4 && inputPassword.value.length <= 60)) {
            warningPassword.style.display = "block";
            inputPassword.style.borderBottom = '2px solid #e87c03';
        } else {
            warningPassword.style.display = "none";
            inputPassword.style.borderBottom = "none";
        }
    }
};

const inputOnFocus = (ev) => {
    inputTouched[ev.name] = true;
};

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePhone = (email) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(email).toLowerCase());
};
