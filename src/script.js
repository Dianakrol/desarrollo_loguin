// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Referencias a los elementos del DOM
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const messageElement = document.getElementById("message");
    const spinner = document.createElement("div"); // Spinner de carga
    
    // Estilos del spinner
    spinner.classList.add("spinner");

    // Base de datos simulada de usuarios (se puede conectar a una API real)
    const usersDB = [
        { email: "karolopez1010@gmail.com", password: "123456" },
        { email: "admin@example.com", password: "admin123" }
    ];

    // Evento de envío del formulario de inicio de sesión
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir recarga de página

        // Obtener valores ingresados
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validación básica de entrada
        if (!validateEmail(email)) {
            showMessage("❌ Ingrese un correo válido", "error");
            return;
        }
        if (password.length < 6) {
            showMessage("❌ La contraseña debe tener al menos 6 caracteres", "error");
            return;
        }

        // Agregar el spinner al botón de login
        loginButton.textContent = "Cargando...";
        loginButton.appendChild(spinner);
        spinner.style.display = "inline-block";
        loginButton.disabled = true; // Deshabilitar el botón mientras carga

        // Simulación de llamada a API con setTimeout
        setTimeout(() => {
            const user = usersDB.find(u => u.email === email && u.password === password);

            if (user) {
                showWelcomeMessage(email);
            } else {
                showMessage("❌ Correo o contraseña incorrectos", "error");
                resetLoginButton();
            }
        }, 2000); // Simulación de espera de 2 segundos
    });

    // Evento para cerrar sesión
    logoutButton.addEventListener("click", function () {
        showMessage("👋 Sesión cerrada correctamente", "info");

        // Restablecer la interfaz
        loginForm.style.display = "block";
        logoutButton.style.display = "none";
        messageElement.style.fontSize = "16px";
        messageElement.style.fontWeight = "normal";
    });

    // Función para mostrar mensajes en pantalla
    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
        messageElement.classList.add("show");

        setTimeout(() => {
            messageElement.classList.remove("show");
        }, 3000);
    }

    // Función para mostrar mensaje de bienvenida
    function showWelcomeMessage(email) {
        showMessage(`🎉 Bienvenido, ${email}!`, "success");
        messageElement.style.fontSize = "20px"; // Aumentar tamaño del mensaje
        messageElement.style.fontWeight = "bold";

        // Ocultar el formulario y mostrar botón de cierre de sesión
        loginForm.style.display = "none";
        logoutButton.style.display = "block";
        resetLoginButton();
    }

    // Función para restablecer el botón de login
    function resetLoginButton() {
        loginButton.textContent = "Iniciar Sesión";
        loginButton.disabled = false;
        spinner.style.display = "none";
    }

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
