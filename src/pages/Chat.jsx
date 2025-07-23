
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TravelPlan } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  Loader2,
  MapPin,
  Calendar,
  Star,
  Users,
  Plane,
  Coffee,
  Camera,
  Mountain,
  Waves,
  TreePine,
  ShoppingBag,
  Utensils,
  Moon,
  Heart,
  Zap,
  Clock,
  DollarSign,
  Hotel
} from "lucide-react";

import MessageBubble from "../components/chat/MessageBubble";
import OptionCard from "../components/chat/OptionCard";
import DatePicker from "../components/chat/DatePicker";
import TravelResults from "../components/chat/TravelResults";

const CHAT_STEPS = {
  WELCOME: 'welcome',
  CONTINENT: 'continent',
  COUNTRY: 'country',
  DATES: 'dates',
  FLEXIBILITY: 'flexibility',
  HOTEL_STARS: 'hotel_stars',
  CHILDREN: 'children',
  FLIGHT_CLASS: 'flight_class',
  CATEGORIES: 'categories',
  TRIP_TYPE: 'trip_type',
  GENERATING: 'generating',
  RESULTS: 'results'
};

const continents = [
  { id: 'אסיה', name: 'אסיה', emoji: '🏯', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop' },
  { id: 'אירופה', name: 'אירופה', emoji: '🏰', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop' },
  { id: 'אמריקה הצפונית', name: 'אמריקה הצפונית', emoji: '🗽', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' },
  { id: 'אמריקה הדרומית', name: 'אמריקה הדרומית', emoji: '🌴', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop' },
  { id: 'אפריקה', name: 'אפריקה', emoji: '🦁', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop' },
  { id: 'אוקיאניה', name: 'אוקיאניה', emoji: '🏄‍♂️', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' }
];

const countryOptions = {
  'אסיה': [
    { id: 'יפן', name: 'יפן', emoji: '🏯', image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&h=300&fit=crop' },
    { id: 'תאילנד', name: 'תאילנד', emoji: '🏛️', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop' },
    { id: 'סינגפור', name: 'סינגפור', emoji: '🏙️', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop' },
    { id: 'דרום קוריאה', name: 'דרום קוריאה', emoji: '🏮', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop' }
  ],
  'אירופה': [
    { id: 'צרפת', name: 'צרפת', emoji: '🥐', image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=300&fit=crop' },
    { id: 'איטליה', name: 'איטליה', emoji: '🍝', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop' },
    { id: 'ספרד', name: 'ספרד', emoji: '💃', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=400&h=300&fit=crop' },
    { id: 'יוון', name: 'יוון', emoji: '🏛️', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop' }
  ],
  'אמריקה הצפונית': [
    { id: 'ארצות הברית', name: 'ארצות הברית', emoji: '🗽', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' },
    { id: 'קנדה', name: 'קנדה', emoji: '🍁', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=300&fit=crop' },
    { id: 'מקסיקו', name: 'מקסיקו', emoji: '🌮', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&h=300&fit=crop' }
  ]
};

const categories = [
  { id: 'קולינריה', name: 'קולינריה', icon: Utensils, color: 'from-red-400 to-red-600', description: 'חוויות אוכל ומסעדות מיוחדות' },
  { id: 'משפחתית', name: 'משפחתית', icon: Users, color: 'from-blue-400 to-blue-600', description: 'פעילויות מתאימות לכל המשפחה' },
  { id: 'חיי לילה', name: 'חיי לילה', icon: Moon, color: 'from-purple-400 to-purple-600', description: 'בארים, מועדונים ובידור לילי' },
  { id: 'תרבות', name: 'תרבות', icon: Camera, color: 'from-yellow-400 to-yellow-600', description: 'מוזיאונים, גלריות ואתרים היסטוריים' },
  { id: 'טבע', name: 'טבע', icon: TreePine, color: 'from-green-400 to-green-600', description: 'פארקים לאומיים ונופים טבעיים' },
  { id: 'ספורט', name: 'ספורט', icon: Mountain, color: 'from-orange-400 to-orange-600', description: 'פעילויות ספורטיביות וחוצות' },
  { id: 'רומנטית', name: 'רומנטית', icon: Heart, color: 'from-pink-400 to-pink-600', description: 'חוויות רומנטיות לזוגות' },
  { id: 'אקסטרים', name: 'אקסטרים', icon: Zap, color: 'from-indigo-400 to-indigo-600', description: 'פעילויות אדרנלין ואתגרים' }
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(CHAT_STEPS.WELCOME);
  const [travelData, setTravelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    addMessage('bot', 'שלום! אני כאן כדי לעזור לכם לתכנן את החופשה המושלמת! 🌟\n\nבואו נתחיל - איזה יבשת מעניינת אתכם?');
    setCurrentStep(CHAT_STEPS.CONTINENT);
  }, []);

  const addMessage = (sender, text, options = null, component = null) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender,
      text,
      options,
      component,
      timestamp: new Date()
    }]);
  };

  const handleOptionSelect = async (option, value) => {
    // Add user selection message
    addMessage('user', option);

    // Parse numeric values correctly
    let processedValue = option;
    if (value === 'hotel_stars') {
      processedValue = parseInt(option.split(' ')[0]); // Extract number from "4 כוכבים"
    } else if (value === 'children_count') {
      if (option === 'בלי ילדים') {
        processedValue = 0;
      } else {
        processedValue = parseInt(option.split(' ')[0]); // Extract number from "3 ילדים"
      }
    }

    const updatedTravelData = { ...travelData, [value]: processedValue };
    setTravelData(updatedTravelData);

    switch (currentStep) {
      case CHAT_STEPS.CONTINENT:
        addMessage('bot', `נהדר! בחרתם ב${option} 🌍\n\nעכשיו, איזו מדינה הכי מעניינת אתכם?`);
        setCurrentStep(CHAT_STEPS.COUNTRY);
        break;

      case CHAT_STEPS.COUNTRY:
        addMessage('bot', `יעד מקסים! ${option} הוא בחירה מעולה 🎯\n\nמתי הייתם רוצים לטוס?`);
        setCurrentStep(CHAT_STEPS.DATES);
        break;

      case CHAT_STEPS.FLEXIBILITY:
        addMessage('bot', `מושלם! 📅\n\nבאיזה רמת מלון הייתם מעוניינים?`);
        setCurrentStep(CHAT_STEPS.HOTEL_STARS);
        break;

      case CHAT_STEPS.HOTEL_STARS:
        addMessage('bot', `בחירה מצוינת! ⭐\n\nכמה ילדים נוסעים איתכם?`);
        setCurrentStep(CHAT_STEPS.CHILDREN);
        break;

      case CHAT_STEPS.CHILDREN:
        addMessage('bot', `נרשם! 👨‍👩‍👧‍👦\n\nבאיזה מחלקת טיסה תרצו לטוס?`);
        setCurrentStep(CHAT_STEPS.FLIGHT_CLASS);
        break;

      case CHAT_STEPS.FLIGHT_CLASS:
        addMessage('bot', `מעולה! ✈️\n\nעכשיו החלק הכיפי - איזה סוג חופשה הכי מתאים לכם? (ניתן לבחור כמה אפשרויות)`);
        setCurrentStep(CHAT_STEPS.CATEGORIES);
        break;

      case CHAT_STEPS.TRIP_TYPE:
        addMessage('bot', `בחירה נהדרת! 🎒\n\nעכשיו אנני מכין לכם את החופשה המושלמת... זה ייקח רק דקה!`);
        await generateTravelPlan(updatedTravelData);
        break;
    }
  };

  const handleDateSelect = (startDate, endDate) => {
    setTravelData(prev => ({
      ...prev,
      start_date: startDate,
      end_date: endDate
    }));

    addMessage('user', `${startDate} עד ${endDate}`);
    addMessage('bot', `תאריכים נהדרים! 📅\n\nהאם התאריכים גמישים?`);
    setCurrentStep(CHAT_STEPS.FLEXIBILITY);
  };

  const handleCategorySelect = (selectedCategories) => {
    setTravelData(prev => ({ ...prev, categories: selectedCategories }));

    const categoryNames = selectedCategories.join(', ');
    addMessage('user', `בחרתי: ${categoryNames}`);
    addMessage('bot', `בחירות מצוינות! 🎯\n\nעוד שאלה אחרונה - מעדיפים לישון במקום אחד או לטייל בין כמה יעדים?`);
    setCurrentStep(CHAT_STEPS.TRIP_TYPE);
  };

  const generateTravelPlan = async (currentTravelData) => {
    setIsLoading(true);
    setCurrentStep(CHAT_STEPS.GENERATING);
    
    try {
      const prompt = `
        צור תכנית טיול מפורטת לחופשה בעברית:
        
        יעד: ${currentTravelData.destination_country}
        תאריכים: ${currentTravelData.start_date} עד ${currentTravelData.end_date}
        קטגוריות: ${currentTravelData.categories?.join(', ')}
        סוג טיול: ${currentTravelData.trip_type || 'לא צוין'}
        רמת מלון: ${currentTravelData.hotel_stars} כוכבים
        ילדים: ${currentTravelData.children_count}
        מחלקת טיסה: ${currentTravelData.flight_class}
        
        החזר רק JSON תקין עם המבנה הבא (ללא טקסט נוסף):
        {
          "daily_itinerary": [
            {
              "day": 1,
              "date": "2025-07-24",
              "activities": [
                {
                  "time": "09:00",
                  "activity": "פעילות",
                  "location": "מקום",
                  "category": "קטגוריה",
                  "cost": "מחיר"
                }
              ]
            }
          ],
          "recommended_hotels": ["מלון 1", "מלון 2"],
          "total_cost": "1000$",
          "tips": ["טיפ 1", "טיפ 2"]
        }
      `;

      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            daily_itinerary: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "number" },
                  date: { type: "string" },
                  activities: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        time: { type: "string" },
                        activity: { type: "string" },
                        location: { type: "string" },
                        category: { type: "string" },
                        cost: { type: "string" }
                      }
                    }
                  }
                }
              }
            },
            recommended_hotels: {
              type: "array",
              items: { type: "string" }
            },
            total_cost: { type: "string" },
            tips: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      const planData = {
        destination_continent: currentTravelData.destination_continent,
        destination_country: currentTravelData.destination_country,
        start_date: currentTravelData.start_date,
        end_date: currentTravelData.end_date,
        flexibility: currentTravelData.flexibility,
        hotel_stars: Number(currentTravelData.hotel_stars),
        children_count: Number(currentTravelData.children_count),
        flight_class: currentTravelData.flight_class,
        categories: currentTravelData.categories,
        trip_type: currentTravelData.trip_type,
        daily_itinerary: result.daily_itinerary,
        status: 'הושלם'
      };

      const savedPlan = await TravelPlan.create(planData);
      setTravelPlan({ ...savedPlan, ...result });
      
      addMessage('bot', `🎉 התכנית שלכם מוכנה! \n\nהכנתי לכם לוח זמנים מפורט ל-${result.daily_itinerary?.length || 0} ימים עם מידע עדכני מהאינטרנט!`);
      setCurrentStep(CHAT_STEPS.RESULTS);
      
    } catch (error) {
      console.error('Error generating travel plan:', error);
      addMessage('bot', 'אופס! משהו השתבש. בואו ננסה שוב עם גרסה פשוטה יותר...');
      
      // Fallback without internet
      try {
        const simpleResult = await InvokeLLM({
          prompt: `צור תכנית טיול פשוטה ל${currentTravelData.destination_country} ל-${currentTravelData.categories?.join(', ')}`,
          response_json_schema: {
            type: "object",
            properties: {
              daily_itinerary: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    day: { type: "number" },
                    activities: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          time: { type: "string" },
                          activity: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });
        
        setTravelPlan({ ...currentTravelData, ...simpleResult });
        addMessage('bot', `✅ הכנתי לכם תכנית טיול בסיסית! אפשר להרחיב אותה יחד.`);
        setCurrentStep(CHAT_STEPS.RESULTS);
        
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        addMessage('bot', 'מצטער, יש בעיה טכנית. אנא נסו שוב מאוחר יותר.');
      }
    }
    
    setIsLoading(false);
  };

  const renderCurrentOptions = () => {
    switch (currentStep) {
      case CHAT_STEPS.CONTINENT:
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {continents.map(continent => (
              <OptionCard
                key={continent.id}
                title={continent.name}
                emoji={continent.emoji}
                image={continent.image}
                onClick={() => handleOptionSelect(continent.name, 'destination_continent')}
              />
            ))}
          </div>
        );

      case CHAT_STEPS.COUNTRY:
        const availableCountries = countryOptions[travelData.destination_continent] || [];
        return (
          <div className="grid grid-cols-2 gap-3">
            {availableCountries.map(country => (
              <OptionCard
                key={country.id}
                title={country.name}
                emoji={country.emoji}
                image={country.image}
                onClick={() => handleOptionSelect(country.name, 'destination_country')}
              />
            ))}
          </div>
        );

      case CHAT_STEPS.DATES:
        return <DatePicker onDateSelect={handleDateSelect} />;

      case CHAT_STEPS.FLEXIBILITY:
        return (
          <div className="grid grid-cols-3 gap-3">
            {['גמיש להאריך', 'גמיש לקצר', 'מדויק'].map(option => (
              <Button
                key={option}
                variant="outline"
                className="p-4 h-auto text-center hover:bg-orange-50 border-2 hover:border-orange-300"
                onClick={() => handleOptionSelect(option, 'flexibility')}
              >
                {option}
              </Button>
            ))}
          </div>
        );

      case CHAT_STEPS.HOTEL_STARS:
        return (
          <div className="grid grid-cols-5 gap-2">
            {[1,2,3,4,5].map(stars => (
              <Button
                key={stars}
                variant="outline"
                className="p-4 h-auto flex flex-col items-center hover:bg-orange-50 border-2 hover:border-orange-300"
                onClick={() => handleOptionSelect(`${stars} כוכבים`, 'hotel_stars')}
              >
                <div className="flex">
                  {Array.from({length: stars}).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm mt-1">{stars} כוכבים</span>
              </Button>
            ))}
          </div>
        );

      case CHAT_STEPS.CHILDREN:
        return (
          <div className="grid grid-cols-4 gap-3">
            {[0,1,2,3].map(count => (
              <Button
                key={count}
                variant="outline"
                className="p-4 h-auto flex flex-col items-center hover:bg-orange-50 border-2 hover:border-orange-300"
                onClick={() => handleOptionSelect(count === 0 ? 'בלי ילדים' : `${count} ילדים`, 'children_count')}
              >
                <Users className="w-6 h-6 mb-2 text-blue-500" />
                <span>{count === 0 ? 'בלי ילדים' : `${count} ילדים`}</span>
              </Button>
            ))}
          </div>
        );

      case CHAT_STEPS.FLIGHT_CLASS:
        return (
          <div className="grid grid-cols-2 gap-3">
            {['תיירותית', 'פרמיום', 'עסקים', 'ראשונה'].map(flightClass => (
              <Button
                key={flightClass}
                variant="outline"
                className="p-4 h-auto flex items-center justify-center hover:bg-orange-50 border-2 hover:border-orange-300"
                onClick={() => handleOptionSelect(flightClass, 'flight_class')}
              >
                <Plane className="w-5 h-5 ml-2" />
                {flightClass}
              </Button>
            ))}
          </div>
        );

      case CHAT_STEPS.CATEGORIES:
        return (
          <CategorySelector onCategorySelect={handleCategorySelect} />
        );

      case CHAT_STEPS.TRIP_TYPE:
        return (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="p-6 h-auto flex flex-col items-center hover:bg-orange-50 border-2 hover:border-orange-300"
              onClick={() => handleOptionSelect('במקום אחד', 'trip_type')}
            >
              <Hotel className="w-8 h-8 mb-3 text-blue-500" />
              <span className="font-semibold">במקום אחד</span>
              <span className="text-sm text-gray-500 mt-1">מלון קבוע, חקירת האזור</span>
            </Button>
            <Button
              variant="outline"
              className="p-6 h-auto flex flex-col items-center hover:bg-orange-50 border-2 hover:border-orange-300"
              onClick={() => handleOptionSelect('טיול בתנועה', 'trip_type')}
            >
              <MapPin className="w-8 h-8 mb-3 text-green-500" />
              <span className="font-semibold">טיול בתנועה</span>
              <span className="text-sm text-gray-500 mt-1">מספר יעדים, מלונות שונים</span>
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  // Category Selector Component
  const CategorySelector = ({ onCategorySelect }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (categoryId) => {
      setSelectedCategories(prev =>
        prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(category => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col items-center transition-all duration-300 ${
                  selectedCategories.includes(category.id)
                    ? `bg-gradient-to-r ${category.color} text-white border-0`
                    : 'hover:bg-orange-50 border-2 hover:border-orange-300'
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <category.icon className="w-6 h-6 mb-2" />
                <span className="font-medium text-sm">{category.name}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        {selectedCategories.length > 0 && (
          <div className="flex justify-center">
            <Button
              onClick={() => onCategorySelect(selectedCategories)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl"
            >
              המשך עם {selectedCategories.length} קטגוריות נבחרות
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">מתכנן החופשות שלכם</h1>
                <p className="text-orange-100">בואו ניצור יחד את החופשה המושלמת!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4" dir="rtl">
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
                <div className="bg-gray-100 rounded-2xl p-4 max-w-md">
                  <p className="text-gray-600">מכין את התכנית המושלמת עבורכם...</p>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Options Area */}
          {currentStep !== CHAT_STEPS.RESULTS && currentStep !== CHAT_STEPS.GENERATING && (
            <div className="p-6 bg-gray-50/50 border-t border-gray-200/50">
              {renderCurrentOptions()}
            </div>
          )}

          {/* Results */}
          {currentStep === CHAT_STEPS.RESULTS && travelPlan && (
            <TravelResults travelPlan={travelPlan} />
          )}
        </div>
      </div>
    </div>
  );
}
