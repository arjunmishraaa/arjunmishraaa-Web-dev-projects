// Array to store the user's questions (stored in localStorage)
let questions = [];

// Toggle dark mode
// Toggle Dark Mode
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('header');

    // Toggle the dark-mode class on the body and header
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
}


// Show the signup form
function showSignUpForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

// Show the login form
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

// Signup function
function signUp() {
    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;
    let confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password === confirmPassword) {
        localStorage.setItem(username, password);
        alert('Sign up successful! Please login.');
        showLoginForm();
    } else {
        document.getElementById('signup-error-msg').textContent = 'Passwords do not match';
    }
}

// Login function
function login() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    if (localStorage.getItem(username) === password) {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('content').style.display = 'block';

        loadQuestions(); // Load previously saved questions from localStorage
    } else {
        document.getElementById('login-error-msg').textContent = 'Invalid username or password';
    }
}

// Add question function
function addQuestion() {
    let questionNumber = document.getElementById('question-number').value;
    let questionName = document.getElementById('question-name').value;
    let leetcodeLink = document.getElementById('leetcode-link').value;

    if (questionNumber && questionName) {
        let question = {
            number: questionNumber,
            name: questionName,
            link: leetcodeLink
        };

        questions.push(question);
        localStorage.setItem('questions', JSON.stringify(questions));

        // Clear input fields
        document.getElementById('question-number').value = '';
        document.getElementById('question-name').value = '';
        document.getElementById('leetcode-link').value = '';

        // Update the displayed question list
        displayQuestions();
    }
}

// Display questions
function displayQuestions() {
    let questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear the existing list

    questions.forEach((question, index) => {
        let questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        questionItem.innerHTML = `
            <h4>Question ${question.number}: ${question.name}</h4>
            ${question.link ? `<p><a href="${question.link}" target="_blank">LeetCode Link</a></p>` : ''}
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;
        questionsList.appendChild(questionItem);
    });
}

// Load questions from localStorage when logged in
function loadQuestions() {
    let savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
        questions = JSON.parse(savedQuestions);
        displayQuestions();
    }
}

// Search questions
function searchQuestions() {
    let searchTerm = document.getElementById('search').value.toLowerCase();
    let filteredQuestions = questions.filter(question =>
        question.name.toLowerCase().includes(searchTerm) || question.number.includes(searchTerm)
    );
    displayFilteredQuestions(filteredQuestions);
}

// Display filtered questions after search
function displayFilteredQuestions(filteredQuestions) {
    let questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear the existing list

    filteredQuestions.forEach((question, index) => {
        let questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        questionItem.innerHTML = `
            <h4>Question ${question.number}: ${question.name}</h4>
            ${question.link ? `<p><a href="${question.link}" target="_blank">LeetCode Link</a></p>` : ''}
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;
        questionsList.appendChild(questionItem);
    });
}

// Delete question function
function deleteQuestion(index) {
    questions.splice(index, 1);
    localStorage.setItem('questions', JSON.stringify(questions));
    displayQuestions(); // Refresh the displayed questions
}

// Logout function
function logout() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';

    // Clear localStorage (you can also choose to just clear questions)
    localStorage.removeItem('questions');
    localStorage.removeItem('username');
}
