document.addEventListener('DOMContentLoaded', function() {
    const chatBotToggle = document.querySelector('.chat-bot-toggle');
    const chatBotContainer = document.querySelector('.chat-bot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-bot-input input');
    const chatSendButton = document.querySelector('.chat-bot-input button');
    const chatMessages = document.querySelector('.chat-bot-messages');
    
    // Simple responses for the chatbot
    const botResponses = {
        'hello': 'Hello! How can I help you today?',
        'hi': 'Hi there! How can I assist you?',
        'products': 'We offer a variety of sustainable coffee products. Check out our Products page for more details!',
        'price': 'Our coffee prices range from $12 to $20 per bag, depending on the variety and roast.',
        'shipping': 'We offer free shipping on orders over $30. Standard shipping takes 3-5 business days.',
        'sustainable': 'Our coffee is grown using sustainable farming practices that protect the environment and support local communities.',
        'contact': 'You can reach us at hello@ecobean.com or call us at (555) 123-4567.',
        'location': 'Our main office is located at 123 Green Street, Portland, OR 97201.',
        'default': 'Thanks for your message! For more detailed information, please visit our website or contact us directly.'
    };
    
    // Toggle chat window
    if (chatBotToggle && chatBotContainer) {
        chatBotToggle.addEventListener('click', function() {
            chatBotContainer.style.display = 'block';
            chatBotToggle.style.display = 'none';
        });
    }
    
    // Close chat window
    if (closeChat && chatBotContainer && chatBotToggle) {
        closeChat.addEventListener('click', function() {
            chatBotContainer.style.display = 'none';
            chatBotToggle.style.display = 'block';
        });
    }
    
    // Send message function
    function sendMessage() {
        if (chatInput.value.trim() === '') return;
        
        // Create user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.textContent = chatInput.value;
        chatMessages.appendChild(userMessage);
        
        // Get bot response
        let botResponse = getBotResponse(chatInput.value.toLowerCase());
        
        // Create bot message with delay
        setTimeout(function() {
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot');
            botMessage.textContent = botResponse;
            chatMessages.appendChild(botMessage);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Get bot response based on user input
    function getBotResponse(input) {
        // Check for keywords in the input
        for (const keyword in botResponses) {
            if (input.includes(keyword)) {
                return botResponses[keyword];
            }
        }
        return botResponses.default;
    }
    
    // Send message on button click
    if (chatSendButton) {
        chatSendButton.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});