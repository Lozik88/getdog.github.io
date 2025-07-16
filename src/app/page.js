'use client';

import React, { useState } from 'react';

export default function ChatBotApp() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Type "get dog" or "get doggy" for a dog picture!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    if (input.toLowerCase() === 'get dog' || input.toLowerCase() === 'get doggy') {
      setLoading(true);
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        const botMessage = { sender: 'bot', text: 'Here’s your doggy!', image: data.message };
        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Failed to fetch dog image.' }]);
      } finally {
        setLoading(false);
      }
    } else {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, I only know "get dog" or "get doggy".' }]);
    }

    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>GetDog Chatbot</h1>
      <div style={{ border: '1px solid #ddd', padding: 10, minHeight: 300 }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <strong>{msg.sender === 'bot' ? '🤖 Bot' : '🧑 You'}:</strong> {msg.text}
            {msg.image && <div><img src={msg.image} alt="dog" style={{ maxWidth: '100%', marginTop: 10 }} /></div>}
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%', padding: 5 }}
          onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
        />
        <button onClick={handleSend} style={{ padding: '5px 10px', marginLeft: 5 }}>
          Send
        </button>
      </div>
    </div>
  );
}
