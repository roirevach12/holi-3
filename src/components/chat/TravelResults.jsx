
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  MapPin, 
  DollarSign, 
  Calendar,
  Star,
  Download,
  Share,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";

const categoryIcons = {
  'אוכל': '🍽️',
  'תרבות': '🏛️',
  'טבע': '🌿',
  'קניות': '🛍️',
  'בידור': '🎭',
  'ספורט': '⚽',
  'מלון': '🏨',
  'תחבורה': '🚗',
  'אחר': '📍' // Added default icon
};

export default function TravelResults({ travelPlan }) {
  const getCategoryIcon = (category) => {
    return categoryIcons[category] || '📍';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'אוכל': 'bg-red-100 text-red-800',
      'תרבות': 'bg-purple-100 text-purple-800',
      'טבע': 'bg-green-100 text-green-800',
      'קניות': 'bg-pink-100 text-pink-800',
      'בידור': 'bg-yellow-100 text-yellow-800',
      'ספורט': 'bg-blue-100 text-blue-800',
      'מלון': 'bg-indigo-100 text-indigo-800',
      'תחבורה': 'bg-gray-100 text-gray-800',
      'אחר': 'bg-gray-100 text-gray-800' // Added default color
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-h-96 overflow-y-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            הטיול שלכם ל{travelPlan.destination_country} 🎉
          </h2>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{travelPlan.start_date} - {travelPlan.end_date}</span>
            </div>
            {travelPlan.total_cost && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>עלות משוערת: {travelPlan.total_cost}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            הורדת PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share className="w-4 h-4" />
            שיתוף
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Heart className="w-4 h-4" />
            שמירה למועדפים
          </Button>
        </div>

        {/* Daily Itinerary */}
        {travelPlan.daily_itinerary && travelPlan.daily_itinerary.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">לוח הזמנים היומי</h3>
            
            {travelPlan.daily_itinerary.map((day) => (
              <Card key={day.day} className="border-r-4 border-r-orange-400">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>יום {day.day}</span>
                    {day.date && <span className="text-sm font-normal text-gray-600">{day.date}</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {day.activities?.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-lg">{getCategoryIcon(activity.category || 'אחר')}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-800">{activity.time}</span>
                          </div>
                          {activity.category && (
                            <Badge className={getCategoryColor(activity.category)}>
                              {activity.category}
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-800 mb-1">{activity.activity}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          {activity.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{activity.location}</span>
                            </div>
                          )}
                          {activity.cost && <span className="font-medium">{activity.cost}</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Recommended Hotels */}
        {travelPlan.recommended_hotels && travelPlan.recommended_hotels.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                מלונות מומלצים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {travelPlan.recommended_hotels.map((hotel, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{hotel}</span>  
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        {travelPlan.tips && travelPlan.tips.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 טיפים לנסיעה</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {travelPlan.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Final CTA */}
        <div className="text-center pt-4 border-t">
          <Button className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            🎯 אני רוצה להזמין את הטיול הזה!
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            נציג שלנו יחזור אליכם בתוך 24 שעות
          </p>
        </div>
      </motion.div>
    </div>
  );
}
