import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Database, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Home() {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate(createPageUrl("Chat"));
  };

  return (
    <div className="hero-gradient min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-4">
            Build something <span className="gradient-text">Lovable</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Create apps and websites by chatting with AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="search-container rounded-3xl p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-right pr-4">
                <span className="text-gray-500 text-lg">Ask Myvection to create an internal tool...</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 rounded-lg px-3 py-2"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 rounded-lg px-4 py-2"
                >
                  <Database className="w-4 h-4" />
                  <span className="text-sm font-medium">Workspace</span>
                </Button>
              </div>

              <Button
                onClick={handleStartPlanning}
                className="bg-gray-800 hover:bg-gray-900 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex-shrink-0 transition-all duration-300 hover:scale-105"
                size="icon"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="h-24"></div>
      </div>
    </div>
  );
}