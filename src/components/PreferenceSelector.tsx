import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Utensils, 
  Mountain, 
  Camera, 
  ShoppingBag, 
  Music,
  Building,
  Waves,
  Church,
  ArrowRight
} from "lucide-react";

interface PreferenceSelectorProps {
  onSubmit: (preferences: PreferenceData) => void;
}

export interface PreferenceData {
  interests: string[];
  duration: number;
  budget: number;
}

const interests = [
  { id: 'temples', label: 'Temples & Spirituality', icon: Church, color: 'temple' },
  { id: 'beaches', label: 'Beaches', icon: Waves, color: 'beach' },  
  { id: 'food', label: 'Local Cuisine', icon: Utensils, color: 'food' },
  { id: 'culture', label: 'Cultural Sites', icon: Building, color: 'travel' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'secondary' },
  { id: 'photography', label: 'Photography', icon: Camera, color: 'accent' },
  { id: 'nature', label: 'Nature & Parks', icon: Mountain, color: 'travel' },
  { id: 'music', label: 'Music & Arts', icon: Music, color: 'primary' },
];

const PreferenceSelector = ({ onSubmit }: PreferenceSelectorProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [duration, setDuration] = useState(3);
  const [budget, setBudget] = useState(10000);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = () => {
    onSubmit({
      interests: selectedInterests,
      duration,
      budget
    });
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What interests you most?
          </h2>
          <p className="text-xl text-muted-foreground">
            Help us create your perfect Udupi experience
          </p>
        </div>

        {/* Interest Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const isSelected = selectedInterests.includes(interest.id);
            
            return (
              <Card
                key={interest.id}
                className={`preference-card p-6 cursor-pointer text-center ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => toggleInterest(interest.id)}
              >
                <Icon className="w-8 h-8 mx-auto mb-3" />
                <div className="font-medium text-sm">{interest.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Trip Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="card-travel p-6">
            <Label htmlFor="duration" className="text-lg font-semibold mb-4 block">
              <MapPin className="w-5 h-5 inline mr-2" />
              Duration of Stay
            </Label>
            <div className="space-y-4">
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
                max="30"
                className="text-lg p-3"
              />
              <p className="text-sm text-muted-foreground">
                How many days will you be in Udupi?
              </p>
            </div>
          </Card>

          <Card className="card-travel p-6">
            <Label htmlFor="budget" className="text-lg font-semibold mb-4 block">
              <span className="text-accent">₹</span> Budget Range
            </Label>
            <div className="space-y-4">
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                min="1000"
                step="1000"
                className="text-lg p-3"
              />
              <p className="text-sm text-muted-foreground">
                Total budget for your trip (including food, travel, accommodation)
              </p>
            </div>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={selectedInterests.length === 0}
            size="lg"
            className="btn-travel-primary text-white px-12 py-4 text-lg font-semibold rounded-full"
          >
            Create My Travel Plan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {selectedInterests.length === 0 && (
            <p className="text-sm text-muted-foreground mt-4">
              Please select at least one interest to continue
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreferenceSelector;