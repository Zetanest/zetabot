class ZetaBot {
  constructor() {
    this.initChatbot();
  }

  initChatbot() {
    // Create floating chat button
    const chatButton = document.createElement("button");
    chatButton.innerText = "💬 Chat";
    chatButton.style.position = "fixed";
    chatButton.style.bottom = "20px";
    chatButton.style.right = "20px";
    chatButton.style.backgroundColor = "#00B894";
    chatButton.style.color = "white";
    chatButton.style.border = "none";
    chatButton.style.padding = "14px 24px";
    chatButton.style.borderRadius = "50px";
    chatButton.style.cursor = "pointer";
    chatButton.style.fontSize = "16px";
    chatButton.style.fontWeight = "bold";
    chatButton.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.2)";
    chatButton.style.transition = "0.3s";
    chatButton.onmouseover = () => chatButton.style.transform = "scale(1.1)";
    chatButton.onmouseout = () => chatButton.style.transform = "scale(1)";
    document.body.appendChild(chatButton);

    // Create chatbot container
    const chatContainer = document.createElement("div");
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "80px";
    chatContainer.style.right = "20px";
    chatContainer.style.width = "350px";
    chatContainer.style.height = "500px";
    chatContainer.style.backgroundColor = "#1E1E1E";
    chatContainer.style.border = "2px solid #00B894";
    chatContainer.style.borderRadius = "20px";
    chatContainer.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.3)";
    chatContainer.style.display = "none";
    chatContainer.style.flexDirection = "column";
    chatContainer.style.overflow = "hidden";
    document.body.appendChild(chatContainer);

    // Chat header
    const chatHeader = document.createElement("div");
    chatHeader.innerText = "ZetaBot AI";
    chatHeader.style.backgroundColor = "#00B894";
    chatHeader.style.color = "white";
    chatHeader.style.padding = "12px";
    chatHeader.style.textAlign = "center";
    chatHeader.style.fontSize = "18px";
    chatHeader.style.fontWeight = "bold";
    chatHeader.style.borderTopLeftRadius = "20px";
    chatHeader.style.borderTopRightRadius = "20px";
    chatContainer.appendChild(chatHeader);

    // Chat messages area
    const chatMessages = document.createElement("div");
    chatMessages.style.flex = "1";
    chatMessages.style.padding = "15px";
    chatMessages.style.overflowY = "auto";
    chatMessages.style.color = "white";
    chatContainer.appendChild(chatMessages);

    // Input field
    const chatInput = document.createElement("input");
    chatInput.type = "text";
    chatInput.placeholder = "Type a message...";
    chatInput.style.width = "calc(100% - 20px)";
    chatInput.style.margin = "10px";
    chatInput.style.padding = "12px";
    chatInput.style.border = "1px solid #00B894";
    chatInput.style.borderRadius = "10px";
    chatInput.style.backgroundColor = "#2C2C2C";
    chatInput.style.color = "white";
    chatContainer.appendChild(chatInput);

    // Button toggle
    chatButton.addEventListener("click", () => {
      chatContainer.style.display = chatContainer.style.display === "none" ? "flex" : "none";
      if (chatContainer.style.display === "flex" && !chatMessages.innerHTML) {
        chatMessages.innerHTML += `<div style='background: #2C2C2C; color: #00B894; padding: 10px; margin: 5px 0; border-radius: 10px;'>Beep boop! Greetings, traveler! How may I assist you on your journey to smarter living?</div>`;
      }
    });

    // Handle message send
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const message = chatInput.value;
        if (message.trim() !== "") {
          chatMessages.innerHTML += `<div style='background: #00B894; color: white; padding: 10px; margin: 5px 0; border-radius: 10px;'>${message}</div>`;
          chatInput.value = "";

          // Send message to backend
          fetch("https://zetabot.vercel.app/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
          })
          .then(response => response.json())
          .then(data => {
            if (data.reply) {
              chatMessages.innerHTML += `<div style='background: #2C2C2C; color: #00B894; padding: 10px; margin: 5px 0; border-radius: 10px;'>${data.reply}</div>`;
            } else {
              chatMessages.innerHTML += `<div style='background: red; color: white; padding: 10px; margin: 5px 0; border-radius: 10px;'>Would you like a complimentary in-depth assessment to address your smart home challenges? If yes, please provide your full name, phone number, and email, and one of our experts will get back to you within 24 hours.</div>`;
            }
          })
          .catch(() => {
            chatMessages.innerHTML += `<div style='background: red; color: white; padding: 10px; margin: 5px 0; border-radius: 10px;'>Error fetching response</div>`;
          });
        }
      }
    });
  }
}

// Load chatbot when page loads
window.onload = () => new ZetaBot();
