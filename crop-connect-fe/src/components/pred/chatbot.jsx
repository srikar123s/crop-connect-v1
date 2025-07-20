import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [visible, setVisible] = useState(true); // toggle visibility



    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post("http://127.0.0.1:8000/ask", {
                text: input,
            });

            const botReply = {
                sender: "bot",
                text: response.data.answer,
            };
            setMessages((prev) => [...prev, botReply]);
        } catch (error) {
            console.error("Error sending message: ", error);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "❌ Failed to connect to server." },
            ]);
        }

        setInput("");
    };

    if (!visible) return null;


    return visible ? (
        <div
            style={{
                position: "fixed",
                top: "80px",
                right: "20px",
                width: "400px",
                height: "calc(100vh - 100px)",
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: "20px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
        >
            {/* Header with close button */}
            <div
                style={{
                    padding: "1rem",
                    background: "#4CAF50",
                    color: "#fff",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <button
                    onClick={() => setVisible(false)}
                    style={{
                        position: "absolute",
                        left: "15px",
                        top: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "1.2rem",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                    aria-label="Back"
                >
                    🔙
                </button>
                🌿 Crop Connect Chatbot
            </div>


            {/* Chat content */}
            <div
                style={{
                    flex: 1,
                    padding: "1rem",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                            backgroundColor: msg.sender === "user" ? "#d9fdd3" : "#e8f0fe",
                            padding: "0.8rem 1rem",
                            borderRadius: "18px",
                            maxWidth: "80%",
                            fontSize: "0.95rem",
                            lineHeight: 1.5,
                            boxShadow:
                                msg.sender === "bot"
                                    ? "0 2px 5px rgba(100, 100, 255, 0.1)"
                                    : "0 2px 5px rgba(0, 150, 0, 0.1)",
                            border:
                                msg.sender === "bot"
                                    ? "1px solid #c3dafe"
                                    : "1px solid #c8e6c9",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        <strong style={{ display: "block", marginBottom: "4px", color: "#333" }}>
                            {msg.sender === "user" ? "👤 You" : "🤖 Bot"}
                        </strong>
                        <ReactMarkdown
                            children={msg.text}
                            components={{
                                strong: ({ node, ...props }) => (
                                    <strong style={{ color: "#2e7d32" }} {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li style={{ marginLeft: "1.2rem", marginBottom: "0.3rem" }} {...props} />
                                ),
                            }}
                        />


                    </div>
                ))}

            </div>

            {/* Input area */}
            <div
                style={{
                    display: "flex",
                    padding: "0.75rem",
                    borderTop: "1px solid #ddd",
                    backgroundColor: "rgba(255,255,255,0.5)",
                }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something about crops..."
                    style={{
                        flex: 1,
                        padding: "0.7rem",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        marginRight: "0.5rem",
                        fontSize: "1rem",
                    }}
                />
                <button
                    onClick={handleSend}
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        padding: "0.7rem 1.2rem",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    ) : null;
};

export default Chatbot;
