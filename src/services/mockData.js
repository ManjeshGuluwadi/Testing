// Mock city data
const cities = [
  { id: 'sydney', name: 'Sydney', region: 'New South Wales' },
  { id: 'melbourne', name: 'Melbourne', region: 'Victoria' },
  { id: 'brisbane', name: 'Brisbane', region: 'Queensland' },
  { id: 'perth', name: 'Perth', region: 'Western Australia' },
  { id: 'adelaide', name: 'Adelaide', region: 'South Australia' },
  { id: 'goldcoast', name: 'Gold Coast', region: 'Queensland' },
  { id: 'canberra', name: 'Canberra', region: 'Australian Capital Territory' },
  { id: 'hobart', name: 'Hobart', region: 'Tasmania' },
  { id: 'darwin', name: 'Darwin', region: 'Northern Territory' },
  { id: 'newcastle', name: 'Newcastle', region: 'New South Wales' }
]

// Weather code mapping
const weatherCodes = {
  clear: { 
    code: 'clear',
    description: 'Sunny',
    descriptionEn: 'Sunny'
  },
  cloudy: {
    code: 'cloudy',
    description: 'Cloudy',
    descriptionEn: 'Cloudy'
  },
  rain: {
    code: 'rain',
    description: 'Rain',
    descriptionEn: 'Rain'
  },
  storm: {
    code: 'storm',
    description: 'Thunderstorm',
    descriptionEn: 'Thunderstorm'
  },
  snow: {
    code: 'snow',
    description: 'Snow',
    descriptionEn: 'Snow'
  }
}

// Generate UV index based on time and location
function generateUVIndex(hour, location) {
  console.log('Generating UV index:', { hour, location });
  
  // Base UV value adjusted by city
  let baseUV = 0
  
  // Adjust base UV value according to city characteristics
  switch (location) {
    case 'darwin': // Darwin: Tropical climate, highest UV index
      baseUV = 4;
      console.log('Darwin base UV:', baseUV);
      break;
    case 'brisbane': // Brisbane: Subtropical, high UV index
    case 'goldcoast': // Gold Coast: Similar to Brisbane
      baseUV = 3;
      console.log('Brisbane/Gold Coast base UV:', baseUV);
      break;
    case 'perth': // Perth: West coast, medium-high UV index
    case 'sydney': // Sydney: East coast
      baseUV = 2;
      console.log('Perth/Sydney base UV:', baseUV);
      break;
    case 'adelaide': // Adelaide: South
    case 'melbourne': // Melbourne: South
      baseUV = 1;
      console.log('Adelaide/Melbourne base UV:', baseUV);
      break;
    case 'hobart': // Hobart: Southernmost, lowest UV index
      baseUV = 0;
      console.log('Hobart base UV:', baseUV);
      break;
    default:
      baseUV = 1.5;
      console.log('Default base UV:', baseUV);
  }

  // Adjust UV value based on time
  let timeMultiplier = 1;
  if (hour < 6 || hour > 19) { // Night and early morning
    timeMultiplier = 0.2;
  } else if (hour < 9 || hour > 16) { // Early morning and evening
    timeMultiplier = 0.5;
  } else if (hour < 11 || hour > 14) { // Morning and afternoon
    timeMultiplier = 0.8;
  } else { // Noon
    timeMultiplier = 1;
  }
  console.log('Time multiplier:', timeMultiplier);

  // Generate final UV value: base value * time multiplier + random fluctuation
  const finalUV = (baseUV * timeMultiplier * 3) + (Math.random() * 2);
  console.log('Final UV value (unrestricted):', finalUV);
  
  // Ensure UV value is within reasonable range (0-12)
  const result = Math.min(Math.max(finalUV, 0), 12);
  console.log('Final UV value (restricted):', result);
  return result;
}

// Generate random weather data
function generateWeatherData(location) {
  const weatherTypes = Object.values(weatherCodes)
  const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
  
  // Adjust temperature range by region
  let tempMin = 15, tempMax = 35
  if (location.includes('darwin')) {
    tempMin = 25; tempMax = 35; // Darwin is consistently hot
  } else if (location.includes('hobart')) {
    tempMin = 8; tempMax = 25; // Hobart is cooler
  } else if (location.includes('perth')) {
    tempMin = 18; tempMax = 32; // Perth has moderate climate
  }
  
  return {
    temperature: Math.floor(tempMin + Math.random() * (tempMax - tempMin)),
    humidity: Math.floor(30 + Math.random() * 50), // 30-80%
    windSpeed: Math.floor(5 + Math.random() * 15), // 5-20km/h
    weatherCode: weather.code,
    weatherDescription: weather.description,
    weatherDescriptionEn: weather.descriptionEn
  }
}

// Mock UV data service
export const mockUVService = {
  // Get location suggestions
  getLocationSuggestions: async (query) => {
    if (!query) return []
    
    const normalizedQuery = query.toLowerCase().trim()
    console.log('Normalized query:', normalizedQuery)
    
    const results = cities.filter(city => {
      const cityName = city.name.toLowerCase()
      const regionName = city.region.toLowerCase()
      const match = cityName.includes(normalizedQuery) || regionName.includes(normalizedQuery)
      console.log(`Checking ${cityName}: ${match}`)
      return match
    })
    
    console.log('Search results:', results)
    return results
  },

  // Fuzzy search support
  getFuzzyLocationSuggestions: async (query) => {
    if (!query) return []
    
    const normalizedQuery = query.toLowerCase().trim()
    console.log('Fuzzy search query:', normalizedQuery)
    
    const results = cities.filter(city => {
      const cityName = city.name.toLowerCase()
      const regionName = city.region.toLowerCase()
      
      // Support exact match
      if (cityName === normalizedQuery || regionName === normalizedQuery) {
        return true
      }
      
      // Support partial match
      if (cityName.includes(normalizedQuery) || regionName.includes(normalizedQuery)) {
        return true
      }
      
      // Support initial letter match
      if (cityName.startsWith(normalizedQuery) || regionName.startsWith(normalizedQuery)) {
        return true
      }
      
      return false
    })
    
    console.log('Fuzzy search results:', results)
    return results
  },

  // Get UV index and weather data
  getUVIndex: async (location) => {
    console.log('Getting UV index, location:', location);
    
    if (!location || !location.id) {
      console.error('Invalid location:', location);
      throw new Error('Invalid location');
    }

    const city = cities.find(c => c.id === location.id);
    if (!city) {
      console.error('City not found:', location.id);
      throw new Error('City not found');
    }

    const hour = new Date().getHours();
    console.log('Current hour:', hour);
    
    const weather = generateWeatherData(location.id);
    console.log('Generated weather data:', weather);
    
    const uvIndex = generateUVIndex(hour, location.id);
    console.log('Generated UV index:', uvIndex);
    
    const result = {
      location: city.name,
      uvIndex: uvIndex.toFixed(1),
      ...weather
    };
    
    console.log('Final return data:', result);
    return result;
  }
} 