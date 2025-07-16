"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ChatBotApp() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    if (input.toLowerCase() === 'get dog' || input.toLowerCase() === 'get doggy') {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Here is a dog for you! 🐶' }, { sender: 'bot', text: data.message }]);
      } catch (error) {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, I could not fetch a dog image right now.' }]);
      }
    } else {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, botResponse]);
    }
    setInput('');
  };

  const getBotResponse = (userText) => {
    if (userText.toLowerCase().includes('hello')) {
      return { sender: 'bot', text: 'Hello there! 👋' };
    } else if (userText.toLowerCase().includes('help')) {
      return { sender: 'bot', text: 'Sure! What do you need help with?' };
    } else {
      return { sender: 'bot', text: "I'm just a simple bot, but I'm here to chat!" };
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <Card>
        <CardContent className="h-80 overflow-y-auto space-y-2 p-4 bg-gray-50 rounded-2xl">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-xl ${
                msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
              }`}
            >
              {msg.text.startsWith('http') ? (
                <img src={msg.text} alt="Dog" className="max-h-48 rounded-xl mx-auto" />
              ) : (
                msg.text
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex mt-4 gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
