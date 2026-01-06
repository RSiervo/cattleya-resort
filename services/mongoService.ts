
import { BookingData, Review, Room } from '../types';

/**
 * MongoDB Atlas Data API Service
 * 
 * IMPORTANT FOR FRONTEND: 
 * The 'mongodb' driver provided in Atlas instructions is for Node.js backends.
 * For this React app, we use the HTTPS Data API.
 * 
 * Setup Instructions:
 * 1. Enable 'Data API' in your Atlas Console.
 * 2. Get your App ID (e.g., 'data-abcde').
 * 3. Replace the placeholder APP_ID below.
 */

const APP_ID = 'data-vlowp'; // Replace this with your actual Atlas App ID
const REGION = 'ap-southeast-1'; // e.g., 'ap-southeast-1' or 'us-east-1'
const CLUSTER_URL = `https://${REGION}.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1`;
const DATA_SOURCE = 'Cluster0'; // From your connection string
const DATABASE = 'cattleya_resort';

const getHeaders = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn('MongoDB Atlas API Key (process.env.API_KEY) is missing.');
  }
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'api-key': apiKey || '',
  };
};

export const mongoService = {
  /**
   * Saves a new booking inquiry to the 'bookings' collection
   */
  async createBooking(booking: any) {
    // If no API key is present, we simulate success for UI testing
    if (!process.env.API_KEY || APP_ID === 'data-vlowp') {
      console.info('MongoDB Simulation Mode: No API Key or App ID configured. Simulating success...');
      return new Promise((resolve) => setTimeout(() => resolve({ insertedId: 'simulated-id' }), 1000));
    }

    try {
      const response = await fetch(`${CLUSTER_URL}/action/insertOne`, {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(),
        body: JSON.stringify({
          dataSource: DATA_SOURCE,
          database: DATABASE,
          collection: 'bookings',
          document: {
            ...booking,
            createdAt: new Date().toISOString(),
            status: 'Pending',
            cluster: DATA_SOURCE
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Atlas Data API Error (${response.status}): ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('MongoDB Cloud Error:', error);
      throw error;
    }
  },

  /**
   * Fetches guest reviews from the cloud
   */
  async fetchReviews(): Promise<Review[]> {
    if (!process.env.API_KEY || APP_ID === 'data-vlowp') return [];

    try {
      const response = await fetch(`${CLUSTER_URL}/action/find`, {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(),
        body: JSON.stringify({
          dataSource: DATA_SOURCE,
          database: DATABASE,
          collection: 'reviews',
          filter: {},
          sort: { date: -1 },
          limit: 3
        }),
      });

      if (!response.ok) return [];

      const result = await response.json();
      return result.documents || [];
    } catch (error) {
      console.warn('Could not reach MongoDB Atlas reviews collection. Falling back to local data.');
      return [];
    }
  },

  /**
   * Fetches room data
   */
  async fetchRooms(): Promise<Room[]> {
    if (!process.env.API_KEY || APP_ID === 'data-vlowp') return [];

    try {
      const response = await fetch(`${CLUSTER_URL}/action/find`, {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(),
        body: JSON.stringify({
          dataSource: DATA_SOURCE,
          database: DATABASE,
          collection: 'rooms',
        }),
      });

      if (!response.ok) return [];

      const result = await response.json();
      return result.documents || [];
    } catch (error) {
      return [];
    }
  }
};
