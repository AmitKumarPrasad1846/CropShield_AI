// DOM Elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const chatbotButton = document.querySelector('.chatbot-button');
const chatbotWindow = document.querySelector('.chatbot-window');
const chatbotClose = document.querySelector('.chatbot-close');
const chatInput = document.querySelector('.chatbot-input input');
const chatSendButton = document.querySelector('.chatbot-input button');
const chatMessages = document.querySelector('.chatbot-messages');
const typingIndicator = document.querySelector('.typing-indicator');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

// Scroll Event Listener
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Chatbot Toggle
chatbotButton.addEventListener('click', () => {
    chatbotWindow.style.display = 'flex';
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

// Features Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Pricing Toggle
pricingToggle.addEventListener('change', () => {
    if (pricingToggle.checked) {
        monthlyPrices.forEach(price => price.style.display = 'none');
        annualPrices.forEach(price => price.style.display = 'block');
    } else {
        monthlyPrices.forEach(price => price.style.display = 'block');
        annualPrices.forEach(price => price.style.display = 'none');
    }
});

// Chatbot Functionality
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageDiv.innerHTML = `${text} <div class="message-time">${time}</div>`;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
        return "Hello there! How can I assist you with your farming needs today?";
    } else if (userMessage.includes('pricing') || userMessage.includes('price') || userMessage.includes('cost')) {
        return "We offer three pricing plans: Starter ($49/month), Professional ($99/month), and Enterprise ($249/month). Would you like to know more about any specific plan?";
    } else if (userMessage.includes('feature') || userMessage.includes('what can you do')) {
        return "I can help you with crop health monitoring, irrigation optimization, yield predictions, pest detection, and more. What specifically are you interested in?";
    } else if (userMessage.includes('crop') && userMessage.includes('health')) {
        return "Our crop health monitoring uses satellite imagery and AI to detect issues before they become visible. We analyze NDVI and other vegetation indices to give you actionable insights.";
    } else if (userMessage.includes('irrigation') || userMessage.includes('water')) {
        return "Our smart irrigation system analyzes soil moisture, weather forecasts, and crop water requirements to optimize your watering schedule, potentially saving up to 25% on water usage.";
    } else if (userMessage.includes('trial') || userMessage.includes('demo')) {
        return "We offer a 14-day free trial with full access to all features. Would you like me to help you set up an account?";
    } else if (userMessage.includes('contact') || userMessage.includes('support')) {
        return "You can reach our support team at support@cropshieldai.com or call us at +1 (555) 123-4567. Our business hours are Monday-Friday, 9AM-5PM PST.";
    } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
        return "You're welcome! Is there anything else I can help you with?";
    } else {
        return "I'm not sure I understand. Could you please rephrase your question? I can help with pricing, features, crop health, irrigation, and general support.";
    }
}

function handleUserMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    // Add user message to chat
    addMessage(userMessage, true);
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response after a short delay to simulate typing
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse);
    }, 1000);
}

// Event listeners for sending messages
chatSendButton.addEventListener('click', handleUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Initialize with a welcome message after a short delay
setTimeout(() => {
    addMessage("Welcome to CropShield AI! I'm here to help you with any questions about our agricultural AI solutions. How can I assist you today?");
}, 500);