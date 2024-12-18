document.getElementById('sendBtn').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;

    if (userInput.trim() !== "") {
        appendMessage(userInput, 'user');
        document.getElementById('userInput').value = '';

        fetchChatbotResponse(userInput);
    }
}

function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerText = message;

    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

function fetchChatbotResponse(userInput) {
    const apiKey = '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';

    fetch('https://api.example.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            message: userInput
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.response;
        appendMessage(botResponse, 'bot');
    })
    .catch(error => {
        appendMessage('Sorry, something went wrong.', 'bot');
        console.error(error);
    });
}
