function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        displayMessage(userInput, 'user');
        getBotResponse(userInput);
        document.getElementById('user-input').value = '';
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
    // Simple hardcoded responses for demonstration
    const responses = {
        'hello': 'Hi there!',
        'how are you?': 'I am just a bot, but I am doing great!',
        'bye': 'Goodbye!'
    };

    const botResponse = responses[userInput.toLowerCase()] || "I'm not sure how to respond to that.";
    setTimeout(() => {
        displayMessage(botResponse, 'bot');
    }, 500); // Simulate a short delay for bot response
}
