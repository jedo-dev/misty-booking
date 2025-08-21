// api.ts
import axios, { type AxiosResponse } from 'axios';
import type {
  AvailableDatesRequest,
  AvailableDatesResponse,
  AvailableTimeSlotRequest,
  Project,
  SaveForm,
} from '../constant';

export const baseUrl = 'https://devmp.misty.group';

export const fetchProject = async (projectCode: string): Promise<Project> => {
  try {
    const response: AxiosResponse<Project> = await axios.get(
      `${baseUrl}/booking/v1.0/booking/project/${projectCode}`,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(`Failed to fetch project: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const fetchAvailableDates = async (
  params: AvailableDatesRequest,
): Promise<AvailableDatesResponse> => {
  try {
    const response: AxiosResponse<AvailableDatesResponse> = await axios.post(
      `${baseUrl}/booking/v1.0/booking/available-dates`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || `Failed to fetch available dates: ${error.message}`,
      );
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const fetchAvailableTimeSlots = async (
  params: AvailableTimeSlotRequest,
): Promise<string[]> => {
  try {
    const response: AxiosResponse<string[]> = await axios.post(
      `${baseUrl}/booking/v1.0/booking/available-time-slots`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || `Failed to fetch available dates: ${error.message}`,
      );
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const saveBooking = async (params: SaveForm): Promise<unknown> => {
  const response: AxiosResponse<unknown> = await axios.post(
      `${baseUrl}/booking/v1.0/booking/create`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
};
