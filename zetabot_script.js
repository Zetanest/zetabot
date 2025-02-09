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
    chatButton.style.backgroundColor = "#0077CC";
    chatButton.style.color = "white";
    chatButton.style.border = "none";
    chatButton.style.padding = "12px 20px";
    chatButton.style.borderRadius = "30px";
    chatButton.style.cursor = "pointer";
    chatButton.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    document.body.appendChild(chatButton);

    // Create chatbot container
    const chatContainer = document.createElement("div");
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "80px";
    chatContainer.style.right = "20px";
    chatContainer.style.width = "300px";
    chatContainer.style.height = "400px";
    chatContainer.style.backgroundColor = "white";
    chatContainer.style.border = "1px solid #ccc";
    chatContainer.style.borderRadius = "10px";
    chatContainer.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
    chatContainer.style.display = "none";
    chatContainer.style.flexDirection = "column";
    chatContainer.style.overflow = "hidden";
    document.body.appendChild(chatContainer);

    // Chat header
    const chatHeader = document.createElement("div");
    chatHeader.innerText = "ZetaBot";
    chatHeader.style.backgroundColor = "#0077CC";
    chatHeader.style.color = "white";
    chatHeader.style.padding = "10px";
    chatHeader.style.textAlign = "center";
    chatHeader.style.fontWeight = "bold";
    chatContainer.appendChild(chatHeader);

    // Chat messages area
    const chatMessages = document.createElement("div");
    chatMessages.style.flex = "1";
    chatMessages.style.padding = "10px";
    chatMessages.style.overflowY = "auto";
    chatContainer.appendChild(chatMessages);

    // Input field
    const chatInput = document.createElement("input");
    chatInput.type = "text";
    chatInput.placeholder = "Type a message...";
    chatInput.style.width = "100%";
    chatInput.style.padding = "10px";
    chatInput.style.border = "none";
    chatInput.style.borderTop = "1px solid #ccc";
    chatContainer.appendChild(chatInput);

    // Button toggle
    chatButton.addEventListener("click", () => {
      chatContainer.style.display = chatContainer.style.display === "none" ? "flex" : "none";
      if (chatContainer.style.display === "flex" && !chatMessages.innerHTML) {
        chatMessages.innerHTML += `<div style='background: #ccc; padding: 5px; margin: 5px 0; border-radius: 5px;'>Beep boop! Greetings, traveler! How may I assist you on your journey to smarter living?</div>`;
      }
    });

    // Handle message send
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const message = chatInput.value;
        if (message.trim() !== "") {
          chatMessages.innerHTML += `<div style='background: #0077CC; color: white; padding: 5px; margin: 5px 0; border-radius: 5px;'>${message}</div>`;
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
              chatMessages.innerHTML += `<div style='background: #ccc; padding: 5px; margin: 5px 0; border-radius: 5px;'>${data.reply}</div>`;
            } else {
              chatMessages.innerHTML += `<div style='background: red; color: white; padding: 5px; margin: 5px 0; border-radius: 5px;'>Would you like a complimentary in-depth assessment to address your smart home challenges? If yes, please provide your full name, phone number, and email, and one of our experts will get back to you within 24 hours.</div>`;
              
              // Capture user details
              let name = prompt("Please enter your full name:");
              let phone = prompt("Please enter your phone number:");
              let email = prompt("Please enter your email:");
              
              if (name && phone && email) {
                fetch("https://zetabot.vercel.app/api/notify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, phone, email }),
                });
              }
            }
          })
          .catch(() => {
            chatMessages.innerHTML += `<div style='background: red; color: white; padding: 5px; margin: 5px 0; border-radius: 5px;'>Error fetching response</div>`;
          });
        }
      }
    });
  }
}

// Load chatbot when page loads
window.onload = () => new ZetaBot();
