class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // Save user data in localStorage
    static saveUser(username, password) {
        const user = new User(username, password);
        localStorage.setItem(username, JSON.stringify(user));
    }

    // Get user data from localStorage
    static getUser(username) {
        const userData = localStorage.getItem(username);
        return userData ? JSON.parse(userData) : null;
    }

    // Validate if the login credentials are correct
    static validateUser(username, password) {
        const user = User.getUser(username);
        return user && user.password === password;
    }

    // Check if a user already exists
    static userExists(username) {
        return localStorage.getItem(username) !== null;
    }
}
