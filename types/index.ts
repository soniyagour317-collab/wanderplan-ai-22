export type BudgetTier = 'Budget' | 'Moderate' | 'Luxury';

export type TravelStyle =
  | 'Relaxed'
  | 'Balanced'
  | 'Fast-paced'
  | 'Adventure'
  | 'Cultural'
  | 'Foodie';

export type ActivityPeriod = 'Morning' | 'Afternoon' | 'Evening';

export type ActivityCategory =
  | 'Sightseeing'
  | 'Culture'
  | 'Food'
  | 'Adventure'
  | 'Leisure'
  | 'Transport'
  | 'Shopping';

export interface Activity {
  id: string;
  timeSlot: string;
  period: ActivityPeriod;
  title: string;
  description: string;
  location: string;
  estimatedCost: number;
  category: ActivityCategory;
  tips?: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  theme: string;
  activities: Activity[];
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  miscellaneous: number;
}

export interface Trip {
  id: string;
  userId?: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budgetTier: BudgetTier;
  targetBudget: number;
  travelStyle: TravelStyle;
  interests: string[];
  transportation: string;
  coverImage: string;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  days: DayPlan[];
  budget: BudgetBreakdown;
  travelTips: string[];
  notes: string;
  createdAt: string;
  isAiGenerated?: boolean;
  generatorSource?: 'gemini-live' | 'sample-engine';
}

export interface PackingItem {
  id: string;
  category: 'Essentials' | 'Clothing' | 'Electronics' | 'Toiletries' | 'Documents' | 'Other';
  label: string;
  packed: boolean;
  custom?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania' | 'Middle East';
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  avgCostPerDay: number;
  bestSeason: string;
  tags: string[];
  topAttractions: string[];
  famousFood: string[];
}

export interface WeatherInfo {
  city: string;
  temp: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  source: 'openweather-live' | 'sample-engine';
  note?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isDemo: boolean;
}

export interface CreateTripInput {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budgetTier: BudgetTier;
  targetBudget?: number;
  travelStyle: TravelStyle;
  interests: string[];
  transportation: string;
}
