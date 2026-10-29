import { CreateTripInput, Trip, DayPlan, BudgetBreakdown } from '../types';

export function calculateDaysBetween(start: string, end: string): number {
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.min(Math.max(diffDays, 1), 14); // Between 1 and 14 days
}

export function generateSmartItinerary(input: CreateTripInput): Omit<Trip, 'id' | 'userId' | 'createdAt'> {
  const numDays = calculateDaysBetween(input.startDate, input.endDate);
  const { destination, budgetTier, travelStyle, travelers, interests } = input;

  // Base daily multiplier based on budget tier
  const tierCostMultiplier = budgetTier === 'Budget' ? 65 : budgetTier === 'Moderate' ? 140 : 320;
  const totalEstimated = tierCostMultiplier * numDays * travelers;

  const budget: BudgetBreakdown = {
    accommodation: Math.round(totalEstimated * 0.42),
    food: Math.round(totalEstimated * 0.28),
    transport: Math.round(totalEstimated * 0.14),
    activities: Math.round(totalEstimated * 0.12),
    miscellaneous: Math.round(totalEstimated * 0.04)
  };

  const days: DayPlan[] = [];
  const currentDate = new Date(input.startDate);

  // Themes list
  const dayThemes = [
    'Arrival, Check-in & Historic Old Town Discovery',
    'Iconic Landmarks & Panoramic City Perspectives',
    'Deep Cultural Immersion & Artisan Heritage',
    'Scenic Nature Escape & Waterfront Stroll',
    'Local Markets, Gastronomy & Hidden Alleys',
    'Art Galleries, Modern Districts & Sunset Views',
    'Leisurely Souvenir Hunting & Farewell Celebration'
  ];

  for (let i = 1; i <= numDays; i++) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const theme = dayThemes[(i - 1) % dayThemes.length];

    days.push({
      dayNumber: i,
      date: dateStr,
      theme,
      activities: [
        {
          id: `act-${i}-1`,
          timeSlot: '09:00 AM - 12:00 PM',
          period: 'Morning',
          title: i === 1 ? `Welcome & Orientation in ${destination}` : `Morning Exploration: Historic Quarter`,
          description: i === 1 
            ? `Arrive, settle into accommodation, grab breakfast at a local café, and orient yourself around the heart of ${destination}.`
            : `Beat the crowds at the city's foremost cultural treasure. Soak in the morning serenity and capture stunning photos.`,
          location: `Central ${destination}`,
          estimatedCost: Math.round(tierCostMultiplier * 0.15),
          category: 'Sightseeing',
          tips: 'Wear comfortable walking shoes; early mornings offer the best lighting.'
        },
        {
          id: `act-${i}-2`,
          timeSlot: '01:00 PM - 04:30 PM',
          period: 'Afternoon',
          title: `Culinary Tasting & Neighborhood Wandering`,
          description: `Savor authentic regional dishes for lunch followed by a relaxed walking tour through local artisan shops, quaint lanes, and vibrant markets.`,
          location: `Old Market District, ${destination}`,
          estimatedCost: Math.round(tierCostMultiplier * 0.22),
          category: 'Food',
          tips: 'Ask locals for their recommended chef specials of the season.'
        },
        {
          id: `act-${i}-3`,
          timeSlot: '06:00 PM - 09:30 PM',
          period: 'Evening',
          title: `Golden Hour Sunset & Evening Dining`,
          description: `Head to an iconic vantage point for golden hour, followed by a memorable dinner enjoying evening music and ambient nightlife.`,
          location: `Waterfront / Viewpoint, ${destination}`,
          estimatedCost: Math.round(tierCostMultiplier * 0.25),
          category: 'Leisure',
          tips: 'Reserve tables in advance, particularly for outdoor rooftop or terrace seating.'
        }
      ]
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Cover image fallback lookup
  const destLower = destination.toLowerCase();
  let cover = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';
  if (destLower.includes('kyoto') || destLower.includes('japan')) {
    cover = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80';
  } else if (destLower.includes('paris') || destLower.includes('france')) {
    cover = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80';
  } else if (destLower.includes('bali')) {
    cover = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80';
  } else if (destLower.includes('amalfi') || destLower.includes('italy')) {
    cover = 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80';
  } else if (destLower.includes('santorini') || destLower.includes('greece')) {
    cover = 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80';
  } else if (destLower.includes('dubai')) {
    cover = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80';
  } else if (destLower.includes('banff') || destLower.includes('canada')) {
    cover = 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80';
  }

  return {
    title: `${destination} ${travelStyle} Getaway`,
    destination,
    startDate: input.startDate,
    endDate: input.endDate,
    travelers: input.travelers,
    budgetTier: input.budgetTier,
    targetBudget: input.targetBudget || totalEstimated,
    travelStyle: input.travelStyle,
    interests: input.interests,
    transportation: input.transportation,
    coverImage: cover,
    status: 'Upcoming',
    days,
    budget,
    travelTips: [
      `Download offline maps and translation apps before departing for ${destination}.`,
      `Always keep local currency cash on hand for street markets, taxis, and small eateries.`,
      `Respect cultural dress codes when visiting sacred shrines, churches, or temples.`,
      `Save your hotel address and emergency hotline in both English and the local dialect.`
    ],
    notes: `Trip created via WanderPlan AI. Don't forget to pack comfortable walking shoes and camera batteries!`,
    isAiGenerated: true,
    generatorSource: 'sample-engine'
  };
}

export const INITIAL_DEMO_TRIPS: Trip[] = [
  {
    id: 'trip-demo-kyoto',
    title: 'Kyoto Cultural & Culinary Journey',
    destination: 'Kyoto, Japan',
    startDate: '2026-11-10',
    endDate: '2026-11-14',
    travelers: 2,
    budgetTier: 'Moderate',
    targetBudget: 1400,
    travelStyle: 'Cultural',
    interests: ['Temples', 'Culinary', 'Gardens', 'Photography'],
    transportation: 'Public transit (Trains & Buses)',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    status: 'Upcoming',
    budget: {
      accommodation: 620,
      food: 420,
      transport: 180,
      activities: 130,
      miscellaneous: 50
    },
    travelTips: [
      'Get an IC transit card (Suica/Pasmo/ICOCA) at Kansai Airport or Kyoto Station.',
      'Fushimi Inari is open 24 hours; visit at dawn (6:00 AM) to experience the torii gates without crowds.',
      'Remove shoes before stepping onto tatami mats in traditional ryokans and temples.'
    ],
    notes: 'Dinner reservations requested at Gion Karyo for Day 2. Pick up green tea matcha kit at Nishiki Market.',
    createdAt: new Date().toISOString(),
    isAiGenerated: true,
    generatorSource: 'sample-engine',
    days: [
      {
        dayNumber: 1,
        date: '2026-11-10',
        theme: 'Arrival, Ancient Shrines & Gion Evening Walk',
        activities: [
          {
            id: 'k-1-1',
            timeSlot: '09:30 AM - 12:30 PM',
            period: 'Morning',
            title: 'Fushimi Inari-taisha Torii Gate Trail',
            description: 'Hike through thousands of vermilion torii gates winding up sacred Mount Inari with fox statues guarding the path.',
            location: 'Fushimi Ward, Kyoto',
            estimatedCost: 0,
            category: 'Sightseeing',
            tips: 'Free admission. The first 15 minutes of the trail are busiest; continue 20 minutes higher for solitary trails.'
          },
          {
            id: 'k-1-2',
            timeSlot: '01:30 PM - 04:00 PM',
            period: 'Afternoon',
            title: 'Nishiki Food Market Tasting Tour',
            description: 'Known as "Kyoto\'s Kitchen", explore five narrow blocks filled with over a hundred seafood, pickle, and wagashi sweet vendors.',
            location: 'Nakagyo Ward, Kyoto',
            estimatedCost: 35,
            category: 'Food',
            tips: 'Try tako tamago (baby octopus with quail egg) and warm soy milk dango.'
          },
          {
            id: 'k-1-3',
            timeSlot: '06:00 PM - 09:00 PM',
            period: 'Evening',
            title: 'Lantern-Lit Stroll in Historic Gion & Shirakawa Canal',
            description: 'Walk past preserved machiya merchant townhouses where you might respectfully spot geiko and maiko on their way to appointments.',
            location: 'Higashiyama Ward, Kyoto',
            estimatedCost: 55,
            category: 'Culture',
            tips: 'Do not touch or block geishas; photograph from a courteous distance.'
          }
        ]
      },
      {
        dayNumber: 2,
        date: '2026-11-11',
        theme: 'Zen Temples & Bamboo Groves of Arashiyama',
        activities: [
          {
            id: 'k-2-1',
            timeSlot: '08:30 AM - 11:30 AM',
            period: 'Morning',
            title: 'Arashiyama Bamboo Forest & Tenryu-ji Temple',
            description: 'Stroll beneath towering green bamboo stalks that rustle gently in the morning breeze, followed by Tenryu-ji\'s World Heritage garden.',
            location: 'Ukyo Ward, Kyoto',
            estimatedCost: 15,
            category: 'Sightseeing',
            tips: 'Arrive before 9 AM for peaceful tranquility.'
          },
          {
            id: 'k-2-2',
            timeSlot: '01:00 PM - 03:30 PM',
            period: 'Afternoon',
            title: 'Kinkaku-ji (The Golden Pavilion)',
            description: 'Marvel at the top two floors completely covered in pure gold leaf shimmering over the serene Kyoko-chi mirror pond.',
            location: 'Kita Ward, Kyoto',
            estimatedCost: 10,
            category: 'Sightseeing',
            tips: 'Ticket is designed as a traditional paper blessing amulet.'
          },
          {
            id: 'k-2-3',
            timeSlot: '06:00 PM - 08:30 PM',
            period: 'Evening',
            title: 'Traditional Kaiseki Multi-Course Dinner',
            description: 'Indulge in seasonal culinary art showcasing bamboo shoots, wild river fish, and exquisite Kyoto tableware.',
            location: 'Pontocho Alley, Kyoto',
            estimatedCost: 85,
            category: 'Food',
            tips: 'Book riverside terrace seating overlooking the Kamogawa river.'
          }
        ]
      }
    ]
  }
];
