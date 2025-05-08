document.addEventListener("DOMContentLoaded", function () {
  // Sample messages data
  const sampleMessages = [
    {
      id: 1,
      author: "Server Admin",
      avatar: "https://via.placeholder.com/40",
      content:
        "Welcome to the Discord clone! This is a demo of what we can build.",
      timestamp: "2023-06-15T10:30:00",
    },
    {
      id: 2,
      author: "Gamer123",
      avatar: "https://via.placeholder.com/40/0088cc",
      content: "Hey everyone! Anyone playing the new game that just released?",
      timestamp: "2023-06-15T10:32:00",
    },
    {
      id: 3,
      author: "CodeNinja",
      avatar: "https://via.placeholder.com/40/cc0088",
      content: "I'm working on a new project using React. It's pretty cool!",
      timestamp: "2023-06-15T10:35:00",
    },
    {
      id: 4,
      author: "PixelArtist",
      avatar: "https://via.placeholder.com/40/00cc88",
      content:
        "Just finished a new pixel art piece, check it out: https://via.placeholder.com/300x200",
      timestamp: "2023-06-15T10:40:00",
    },
  ];

  // Render sample messages
  renderMessages(sampleMessages);

  // Set up message sending
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendMessage");

  // Send message by clicking the send button
  sendButton.addEventListener("click", function () {
    sendMessage();
  });

  // Send message by pressing Enter
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Channel switching
  const channels = document.querySelectorAll(".channel");
  channels.forEach((channel) => {
    channel.addEventListener("click", function () {
      // Remove active class from all channels
      channels.forEach((ch) => ch.classList.remove("active"));

      // Add active class to clicked channel
      this.classList.add("active");

      // Update channel name in header
      const channelName = this.querySelector("span").textContent;
      document.querySelector(".chat-header-left span").textContent =
        channelName;

      // Clear messages when switching channels
      document.getElementById("chatMessages").innerHTML = "";

      // Load different messages based on channel
      if (channelName === "general") {
        renderMessages(sampleMessages);
      } else {
        // Show a system message for other channels
        const systemMessage = {
          id: 999,
          author: "System",
          avatar: "https://via.placeholder.com/40/ff0000",
          content: `Welcome to the #${channelName} channel!`,
          timestamp: new Date().toISOString(),
        };
        renderMessages([systemMessage]);
      }
    });
  });

  // Server switching
  const servers = document.querySelectorAll(".server-icon");
  servers.forEach((server) => {
    server.addEventListener("click", function () {
      // Remove active class from all servers
      servers.forEach((s) => s.classList.remove("active"));

      // Add active class to clicked server
      this.classList.add("active");

      // You could update channels and other content based on server here
    });
  });

  // Functions
  function renderMessages(messages) {
    const chatMessages = document.getElementById("chatMessages");

    messages.forEach((message) => {
      const messageEl = document.createElement("div");
      messageEl.className = "message";

      const formattedDate = formatTimestamp(message.timestamp);

      messageEl.innerHTML = `
              <div class="message-avatar">
                  <img src="${message.avatar}" alt="${message.author}">
              </div>
              <div class="message-content">
                  <div class="message-header">
                      <span class="message-author">${message.author}</span>
                      <span class="message-timestamp">${formattedDate}</span>
                  </div>
                  <div class="message-text">${formatMessageContent(
                    message.content
                  )}</div>
              </div>
          `;

      chatMessages.appendChild(messageEl);
    });

    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const messageContent = messageInput.value.trim();

    if (messageContent) {
      const newMessage = {
        id: Date.now(),
        author: "Username", // Current user
        avatar: "https://via.placeholder.com/40",
        content: messageContent,
        timestamp: new Date().toISOString(),
      };

      renderMessages([newMessage]);
      messageInput.value = "";
    }
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today
      return `Today at ${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    } else if (diffDays === 1) {
      // Yesterday
      return `Yesterday at ${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    } else {
      // Other days
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }

  function formatMessageContent(content) {
    // Basic formatting for links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedContent = content.replace(urlRegex, function (url) {
      if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
        return `<div class="message-image"><img src="${url}" alt="Image"></div>`;
      } else {
        return `<a href="${url}" target="_blank">${url}</a>`;
      }
    });

    return formattedContent;
  }

  // Add some typing indicators and effects
  messageInput.addEventListener("focus", function () {
    const channel = document.querySelector(".channel.active span").textContent;
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing-indicator";
    typingIndicator.innerHTML = `<span>Username is typing in #${channel}...</span>`;

    // Remove any existing typing indicators
    const existingIndicator = document.querySelector(".typing-indicator");
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Add new indicator
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  messageInput.addEventListener("blur", function () {
    // Remove typing indicator
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
      setTimeout(() => {
        typingIndicator.remove();
      }, 1000);
    }
  });

  // Add style for embedded images and typing indicator
  const style = document.createElement("style");
  style.textContent = `
      .message-image {
          max-width: 400px;
          margin-top: 8px;
          border-radius: 4px;
          overflow: hidden;
      }
      
      .message-image img {
          max-width: 100%;
          height: auto;
      }
      
      .typing-indicator {
          padding: 8px;
          color: #72767d;
          font-size: 14px;
          font-style: italic;
      }
      
      a {
          color: #00b0f4;
          text-decoration: none;
      }
      
      a:hover {
          text-decoration: underline;
      }
  `;
  document.head.appendChild(style);
});
