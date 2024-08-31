let intents = [];

// Load intents.json file
fetch('intents.json')
    .then(response => response.json())
    .then(data => {
        intents = data.intents;
    })
    .catch(error => console.error('Error loading intents:', error));

// Toggle Chat Visibility
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatIcon = document.getElementById('chat-icon');

    if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'flex';
        chatIcon.style.display = 'none';
    } else {
        chatContainer.style.display = 'none';
        chatIcon.style.display = 'flex';
    }
}

// Send Message
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
        displayMessage(message, 'user');
        userInput.value = '';

        // Generate and display bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            displayMessage(botResponse, 'bot');
        }, 500);  // Simulate delay
    }
}

// Display Message in Chat
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Get Bot Response from intents.json
function getBotResponse(message) {
    const normalizedMessage = message.toLowerCase().replace(/[^\w\s]/gi, '');

    for (const intent of intents) {
        for (const pattern of intent.patterns) {
            if (normalizedMessage.includes(pattern.toLowerCase())) {
                const responses = intent.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }

    // If no match is found, return default response
    const defaultIntent = intents.find(intent => intent.tag === 'default');
    const defaultResponses = defaultIntent.responses;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
