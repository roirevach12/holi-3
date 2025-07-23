import React from "react";
import { motion } from "framer-motion";

export default function OptionCard({ title, emoji, image, onClick, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-orange-300 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        {image && (
          <div className="h-24 bg-cover bg-center relative" style={{ backgroundImage: `url(${image})` }}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-2 right-2 text-2xl">
              {emoji}
            </div>
          </div>
        )}
        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-center">{title}</h3>
          {description && (
            <p className="text-xs text-gray-500 text-center mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}