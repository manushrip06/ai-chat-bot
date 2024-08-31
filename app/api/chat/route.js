import { NextResponse } from "next/server";

// Store user sessions for context management
let sessions = {};

// Function to manage sessions
function getSession(userId) {
    if (!sessions[userId]) {
        sessions[userId] = {
            context: [],
        };
    }
    return sessions[userId];
}

// Function to check if the message contains any of the patterns
function matchPattern(message, patterns) {
    const lowercasedMessage = message.toLowerCase().trim();
    return patterns.some(pattern => lowercasedMessage.includes(pattern));
}

// Function to determine a response based on user message
function getResponse(userId, message) {
    const session = getSession(userId);
    const context = session.context;

    console.log("Received message:", message);
    console.log("Context:", context);

    if (!message || !message.trim()) {
        return "It seems like you didn't enter anything. How can I assist you today?";
    }

    const lowercaseMessage = message.toLowerCase().trim();

    // Basic greeting
    if (matchPattern(lowercaseMessage, ["hello", "hi", "hey", "greetings"])) {
        return "Hello! I'm the HeadStarter AI assistant. How can I help you today?";
    }

    // About HeadStarter
    if (matchPattern(lowercaseMessage, ["what is headstarter", "tell me about headstarter", "headstarter info", "about headstarter"])) {
        session.context.push("headstarter_info");
        return `HeadStarter is an innovative AI-powered platform designed to help software engineers excel in their job interviews and accelerate their careers. Our platform offers:

• Comprehensive interview preparation
• AI-driven mock interviews
• Coding challenges with real-time feedback
• System design problem-solving exercises
• Behavioral interview practice
• Personalized study plans
• Performance analytics and improvement tracking

Would you like to know more about specific features or how to get started?`;
    }

    // Pricing
    if (matchPattern(lowercaseMessage, ["price", "cost", "how much", "pricing", "subscription", "plan"])) {
        return `Great news! HeadStarter is completely free to use.
We believe in making interview preparation accessible to all software engineers.

Our free platform includes:
• AI-driven mock interviews
• Coding challenges with real-time feedback
• System design problem-solving exercises
• Behavioral interview practice
• Personalized study plans
• Performance analytics and improvement tracking

There are no hidden fees or premium tiers.
All features are available to every user at no cost.

Would you like to know how to get started with HeadStarter?`;
    }

    // Services
    if (matchPattern(lowercaseMessage, ["services", "features", "what do you offer"])) {
        return `HeadStarter offers a range of services to boost your interview performance:

1. AI-powered Mock Interviews
   • Realistic interview simulations
   • Adaptive difficulty based on your performance

2. Coding Challenges
   • Real-time feedback on your code
   • Coverage of popular algorithms and data structures

3. System Design Problems
   • Practice designing scalable systems
   • Learn best practices in system architecture

4. Behavioral Interview Preparation
   • Guidance on structuring your responses
   • Practice with common behavioral questions

5. Personalized Study Plans
   • Tailored to your strengths and weaknesses
   • Adaptive learning paths

6. Performance Analytics
   • Track your progress over time
   • Identify areas for improvement

Which service would you like more information about?`;
    }

    // How to get started
    if (matchPattern(lowercaseMessage, ["how to start", "get started", "sign up", "register"])) {
        return `Getting started with HeadStarter is easy:

1. Visit our website: www.headstarter.ai
2. Click the 'Sign Up' button
3. Choose your plan:
   • You can start with a 7-day free trial
4. Create your profile:
   • Set your interview goals
   • Specify your areas of interest
5. Start practicing:
   • Use our AI-powered platform
   • Begin with a skills assessment

Do you need help with any of these steps? Or would you like more information about our plans?`;
    }

    // Technical support
    if (matchPattern(lowercaseMessage, ["technical issue", "problem", "not working", "bug", "error"])) {
        return `I'm sorry to hear you're experiencing technical difficulties. Here are some steps you can try:

1. Clear your browser cache and cookies
2. Try a different browser or device
3. Check our status page at status.headstarter.ai for any known issues

If the problem persists, please contact our support team:
• Email: support@headstarter.ai
• Live chat: Available on our website
• Phone: 1-800-HEAD-START (available 9 AM - 5 PM EST, Monday to Friday)

Please provide details of the issue you're facing when contacting support.`;
    }

    // Default response
    return `I'm not quite sure how to answer that. Would you like me to connect you with a human representative for more detailed information about HeadStarter? 

Alternatively, you can ask me about:
• What HeadStarter is
• Our services and features
• Pricing plans
• How to get started
• Technical support`;
}
// Handle POST requests
// ... previous code remains the same ...

// Handle POST requests
// ... previous code remains the same ...

// Handle POST requests
// ... previous code remains the same ...

// Handle POST requests
export async function POST(req) {
    try {
        // Parse the incoming request JSON
        const messages = await req.json();
        console.log("Received data:", messages);  // Log the entire received data

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
        }

        const lastMessage = messages[messages.length - 1];
        const userId = "default";  // Use a unique identifier for each user in a real scenario
        const userMessage = lastMessage.content || "";

        // Debugging logs
        console.log("Request received:");
        console.log("User ID:", userId);
        console.log("Message:", userMessage);

        // Get the bot's response
        const botResponse = getResponse(userId, userMessage);
        
        // Log the response for debugging
        console.log("Bot response:", botResponse);

        // Return the response as plain text
        return NextResponse.json(botResponse);

    } catch (error) {
        // Log errors and return a 500 response
        console.error("Error handling POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}