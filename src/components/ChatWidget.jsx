"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="chat-widget" className="fixed bottom-4 right-4">
      {isOpen && (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg w-80 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Chat with me</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="mb-4">
            <p>Hi there! How can I help you?</p>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700">
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-500 text-white p-4 rounded-xl shadow-lg hover:bg-purple-700"
      >
        {isOpen ? "Close Chat" : "Chat with me 👋"}
      </button>
    </div>
  );
}
