import axios from 'axios';

// Configure base URL for API requests
const BASE_URL = 'http://localhost:8080/api'; // Update this if your backend is hosted elsewhere

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const trainService = {
  // Search for trains between stations
  searchTrains: async (departureStation, arrivalStation, date) => {
    try {
      // Handle empty parameters gracefully
      const params = {};
      if (departureStation) params.departureStation = departureStation;
      if (arrivalStation) params.arrivalStation = arrivalStation;
      if (date) params.date = date;
      
      const response = await apiClient.get('/trains/search', { params });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Return empty array when no trains found
        return [];
      } else {
        console.error('Error searching trains:', error);
        throw error;
      }
    }
  },

  // Get available trains for a specific route
  getTrainsForRoute: async (seferId, departureStation, arrivalStation, date) => {
    try {
      const response = await apiClient.get('/trains/route', {
        params: {
          seferId,
          departureStation,
          arrivalStation,
          date
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching route trains:', error);
      throw error;
    }
  },

  getTrainLines: async (station) => {
      try{
        const response = await apiClient.get('/seferler/stationCenter', {
          params: {
            station
          }
        });
        return response.data;
      }
      catch (error){
        console.error('Error fetching trainlines:',error);
        throw error;
      }
  },

  // Get wagon information for a specific train
  getWagons: async (trainId) => {
    try {
      const response = await apiClient.get(`/trains/${trainId}/wagons`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wagons:', error);
      throw error;
    }
  },

  // Get all available stations/cities
  getAllStations: async () => {
    try {
      const response = await apiClient.get('/seferler/stations');
      return response.data;
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  },
  
  // Book seats on a train
  bookSeats: async (finalSeatUpdate) => {
    try {
      const response = await apiClient.put('/trains/seatUpdate', finalSeatUpdate);
      return response.data;
    } catch (error) {
      console.error('Error booking seats:', error);
      throw error;
    }
  },
  
  // Get seat availability for a specific train
  getSeatAvailability: async (trainId, wagonId) => {
    try {
      const response = await apiClient.get(`/trains/${trainId}/wagons/${wagonId}/seats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seat availability:', error);
      throw error;
    }
  },

  getAllSeferler: async () => {
    try{
      const response = await apiClient.get(`/seferler`);
      return response.data;
    }
    catch (error){
      console.error('Error fetching trainlines:', error);
      throw error;
    }
  },

  getAllTrains: async () => {
    try{
      const response = await apiClient.get(`/seferler`);
      return response.data;
    }
    catch (error){
      console.error('Error fetching trains:', error);
      throw error;
    }
  },

  createSefer: async (trainLine) => {
    try{
      const response = await apiClient.post(`/seferler`,trainLine);
      return response.data;
    }
    catch (error){
      console.error('Error creating trainline:', error);
      throw error;
    }
  },

  getMaxTrainId: async () => {
    try{
      const response = await apiClient.get(`/trains/maxTrainId`);
      return response.data;
    }
    catch (error){
      console.error('Error fetching max train id:', error);
      throw error;
    }
  },

  createTrain: async (trainData) => {
    try{
      const response = await apiClient.post(`/trains`,trainData);
      return response.data;
    }
    catch (error){
      console.error('Error creating train:', error);
      throw error;
    }
  },
  createWagons: async (wagonData) => {
    try{
      const response = await apiClient.post(`/wagons`,wagonData);
      return response.data;
    }
    catch (error){
      console.error('Error creating train:', error);
      throw error;
    }
  },

  getAllTrainsBySeferId: async (seferId) => {
    try{
      const response = await apiClient.get(`/trains/getBySeferId`,{
        params: { id: seferId }
      });
      return response.data;
    }
    catch (error){
      console.error('Error fetching trains:', error);
      throw error;
    }
  }



};

export default trainService;