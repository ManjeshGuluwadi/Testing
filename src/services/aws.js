// AWS API Gateway endpoint
const API_ENDPOINT = process.env.VUE_APP_API_GATEWAY_ENDPOINT;

// UV Data Service
export const uvService = {
  // Get UV Index
  getUVIndex: async (location) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/uv-index?location=${encodeURIComponent(location)}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching UV index:', error);
      throw error;
    }
  },

  // Get Location Suggestions
  getLocationSuggestions: async (query) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/locations/suggest?query=${encodeURIComponent(query)}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      throw error;
    }
  }
};

// Analytics Service
export const analyticsService = {
  // Get Age Group UV Sensitivity Data
  getAgeGroupData: async (year) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/analytics/age-group?year=${year}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching age group data:', error);
      throw error;
    }
  },

  // Get UV Index Distribution by State
  getStateDistribution: async (year) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/analytics/state-distribution?year=${year}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching state distribution:', error);
      throw error;
    }
  },

  // Get Monthly Temperature Trends
  getTemperatureData: async (year) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/analytics/temperature?year=${year}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching temperature data:', error);
      throw error;
    }
  }
}; 