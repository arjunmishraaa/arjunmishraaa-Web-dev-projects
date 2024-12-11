class Question {
    constructor(number, name, link) {
        this.number = number;
        this.name = name;
        this.link = link;
    }

    // Save a question for a user
    static saveQuestion(username, question) {
        let questions = Question.getQuestions(username);
        questions.push(question);
        localStorage.setItem(`${username}_questions`, JSON.stringify(questions));
    }

    // Get all questions for a user
    static getQuestions(username) {
        const questions = localStorage.getItem(`${username}_questions`);
        return questions ? JSON.parse(questions) : [];
    }

    // Delete a question
    static deleteQuestion(username, index) {
        let questions = Question.getQuestions(username);
        questions.splice(index, 1);
        localStorage.setItem(`${username}_questions`, JSON.stringify(questions));
    }
}
