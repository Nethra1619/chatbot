let intents = [];

// Fetch the intents from the JSON file
fetch('intents.json')
    .then(response => response.json())
    .then(data => {
        intents = data.intents;
    })
    .catch(error => console.error('Error fetching intents:', error));

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
    const lowerInput = userInput.toLowerCase();
    let botResponse = null;

    // Match user input to an intent
    for (let intent of intents) {
        for (let pattern of intent.patterns) {
            if (lowerInput.includes(pattern)) {
                botResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                break;
            }
        }
        if (botResponse) break;
    }

    // If no intent matched, use the default response
    if (!botResponse) {
        const defaultIntent = intents.find(intent => intent.tag === "default");
        botResponse = defaultIntent.responses[Math.floor(Math.random() * defaultIntent.responses.length)];
    }

    setTimeout(() => {
        displayMessage(botResponse, 'bot');
    }, 500); // Simulate a short delay for bot response
}
