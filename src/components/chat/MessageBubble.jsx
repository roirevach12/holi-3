import React from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export default function MessageBubble({ message }) {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isBot 
          ? 'bg-gradient-to-r from-orange-500 to-blue-500' 
          : 'bg-gray-600'
      }`}>
        {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
      </div>
      
      <div className={`max-w-md ${isBot ? '' : 'text-left'}`}>
        <div className={`rounded-2xl p-4 ${
          isBot 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-gradient-to-r from-orange-500 to-blue-500 text-white'
        }`}>
          <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
        </div>
        
        {message.component && (
          <div className="mt-3">
            {message.component}
          </div>
        )}
      </div>
    </motion.div>
  );
}