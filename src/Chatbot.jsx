import { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import './index.css'; // Import your CSS file for styling

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Function to send the message to your backend and get the response
  const handleSend = async () => {
    if (input.trim()) {
      // Add user's message to the chat
      const userMessage = input;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userMessage }
      ]);
      setInput(""); // Clear input field

      try {
        // Send the user's message to your backend
        const response = await axios.post("https://mohannednes.pythonanywhere.com/chatbot/chatbot", {
          query: userMessage // Ensure the key is 'query'
        });

        // Extract the bot's response from the backend
        const botResponse = response.data.response;

        // Add bot's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse }
        ]);
      } catch (error) {
        console.error("Error fetching the bot's response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "There was an error processing your request. Please try again later." }
        ]);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-button ${isOpen ? "open" : ""}`} onClick={toggleChatbot}>
        💬
      </div>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">Chat with Us!</div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

