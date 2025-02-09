export default function handler(req, res) {
    if (req.method === "POST") {
        const { message } = req.body;
        const lowerMessage = message.toLowerCase();

        let reply;

        // **Star Wars-themed greeting for first-time users**
        if (lowerMessage === "hello" || lowerMessage === "hi") {
            reply = "Beep boop! Greetings, traveler! How may I assist you on your journey to smarter living?";
        
        // **Answering location-based questions**
        } else if (lowerMessage.includes("where are you based")) {
            reply = "We are located in UAE, Dubai, and our headquarters is in Houston, TX, USA.";

        // **Responding as a smart home AI expert**
        } else if (lowerMessage.includes("smart home") || lowerMessage.includes("ai home")) {
            reply = "At Zeta Nest, we provide AI-powered smart home solutions designed to make your home intelligent, energy-efficient, and seamlessly connected.";

        // **Handling complex AI and robotics questions**
        } else if (lowerMessage.includes("ai") || lowerMessage.includes("robotics")) {
            reply = "Zeta Nest specializes in AI-driven automation, predictive maintenance, and intelligent robotics to enhance smart home living.";

        // **Offering Complimentary Assessment**
        } else if (lowerMessage.includes("assessment")) {
            reply = "Would you like a complimentary in-depth assessment to address your smart home challenges? If yes, please provide your full name, phone number, and email, and one of our experts will get back to you within 24 hours.";

        // **Fail-safe response and human agent escalation**
        } else {
            reply = "I'm still learning! Would you like me to connect you with a live agent or send an email to info@zetanest.com?";
        }

        res.status(200).json({ reply });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
