export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 22) return 'Good evening';
  return 'Good night';
}

export const mockResponses = {
  'What\'s the wait time?': {
    message: "Currently, the estimated wait time is about 25 minutes. This is based on real-time data from the venue. Would you like me to notify you when the wait time drops below 15 minutes?",
    suggestions: ["Yes, notify me", "Show me peak hours", "Is this normal?"]
  },
  'How busy is it?': {
    message: "The venue is moderately busy right now, operating at about 75% capacity. Based on historical data, it should start getting less crowded in about an hour.",
    suggestions: ["Show me a graph", "Best time to come?", "Reserve a spot"]
  },
  'When should I arrive?': {
    message: "Based on current trends, I recommend arriving around 8:30 PM. The crowd typically thins out by then, and you'll have a shorter wait time.",
    suggestions: ["Check availability", "Show other times", "Set a reminder"]
  }
};

export const getGreeting = (firstName?: string): string => {
  const hour = new Date().getHours();
  let greeting = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return firstName ? `${greeting}, ${capitalize(firstName)}!` : greeting;
};