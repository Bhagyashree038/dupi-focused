import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Star, 
  Camera, 
  Utensils, 
  Car,
  Building,
  MessageCircle
} from "lucide-react";
import attractionsImage from "@/assets/udupi-attractions.jpg";
import foodImage from "@/assets/food-dosa.jpg";
import templeImage from "@/assets/krishna-temple.jpg";
import type { PreferenceData } from "./PreferenceSelector";

interface TravelPlanProps {
  preferences: PreferenceData;
  onShowChat: () => void;
}

const sampleRecommendations = {
  temples: [
    {
      name: "Sri Krishna Temple",
      description: "Ancient temple with unique architecture and spiritual significance",
      duration: "2-3 hours",
      cost: "Free",
      rating: 4.8,
      image: templeImage,
      highlights: ["Darshan", "Architecture", "Spiritual experience"]
    }
  ],
  beaches: [
    {
      name: "Malpe Beach",
      description: "Pristine beach perfect for sunset views and water activities",
      duration: "3-4 hours", 
      cost: "₹200-500",
      rating: 4.6,
      image: attractionsImage,
      highlights: ["Sunset", "Water sports", "Beach walks"]
    }
  ],
  food: [
    {
      name: "Traditional Udupi Cuisine",
      description: "Authentic South Indian vegetarian delicacies",
      duration: "1-2 hours",
      cost: "₹150-400 per person",
      rating: 4.9,
      image: foodImage,
      highlights: ["Dosa varieties", "Filter coffee", "Traditional ambiance"]
    }
  ]
};

const hotels = [
  {
    name: "Hotel Janardana",
    type: "Budget",
    price: "₹1,500-2,500/night",
    rating: 4.2,
    amenities: ["AC", "WiFi", "Restaurant"],
    location: "Near Krishna Temple"
  },
  {
    name: "Fortune Inn Valley View",
    type: "Mid-range",
    price: "₹3,500-5,500/night", 
    rating: 4.5,
    amenities: ["Pool", "Spa", "Multi-cuisine restaurant"],
    location: "Manipal Road"
  },
  {
    name: "The Ocean Pearl",
    type: "Luxury",
    price: "₹6,000-10,000/night",
    rating: 4.7,
    amenities: ["Sea view", "Premium dining", "Conference facilities"],
    location: "Near Malpe Beach"
  }
];

const TravelPlan = ({ preferences, onShowChat }: TravelPlanProps) => {
  const generateDayPlan = (day: number) => {
    const activities = [];
    
    if (preferences.interests.includes('temples')) {
      activities.push(...sampleRecommendations.temples);
    }
    if (preferences.interests.includes('beaches')) {
      activities.push(...sampleRecommendations.beaches);
    }
    if (preferences.interests.includes('food')) {
      activities.push(...sampleRecommendations.food);
    }
    
    return activities.slice(0, 3); // Limit to 3 activities per day
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Personalized Udupi Experience
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            {preferences.duration} day(s) • ₹{preferences.budget.toLocaleString()} budget
          </p>
          <Button 
            onClick={onShowChat}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask Travel Assistant
          </Button>
        </div>

        {/* Day-wise Itinerary */}
        <div className="space-y-8 mb-16">
          {Array.from({ length: preferences.duration }, (_, index) => (
            <Card key={index} className="card-travel p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mr-4">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold">Day {index + 1}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generateDayPlan(index + 1).map((activity, actIndex) => (
                  <Card key={actIndex} className="overflow-hidden">
                    <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{activity.name}</h4>
                        <div className="flex items-center text-sm text-accent">
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          {activity.rating}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          {activity.duration}
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-accent font-semibold mr-2">₹</span>
                          {activity.cost}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {activity.highlights.map((highlight, hIndex) => (
                            <Badge key={hIndex} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Hotels Section */}
        <Card className="card-travel p-6 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Building className="w-6 h-6 mr-3 text-primary" />
            Recommended Accommodations
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold">{hotel.name}</h4>
                  <Badge variant={hotel.type === 'Budget' ? 'secondary' : hotel.type === 'Luxury' ? 'default' : 'outline'}>
                    {hotel.type}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{hotel.location}</p>
                <p className="font-semibold text-primary mb-3">{hotel.price}</p>
                
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-accent fill-current mr-1" />
                  <span className="text-sm">{hotel.rating}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.map((amenity, aIndex) => (
                    <Badge key={aIndex} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Travel Tips */}
        <Card className="card-travel p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Car className="w-6 h-6 mr-3 text-primary" />
            Travel Tips & Routes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Getting Around</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Auto-rickshaws: ₹20-50 for short distances</li>
                <li>• Local buses: ₹10-30 per journey</li>
                <li>• Rental scooter: ₹300-500 per day</li>
                <li>• Taxi services: ₹15-20 per km</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Best Times to Visit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Temples: Early morning (6-8 AM) or evening (6-8 PM)</li>
                <li>• Beaches: Late afternoon for sunset views</li>
                <li>• Restaurants: Avoid peak lunch hours (12-2 PM)</li>
                <li>• Markets: Morning hours for fresh produce</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TravelPlan;