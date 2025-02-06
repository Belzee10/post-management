import { http } from '@/core/services/http';
import logger from '@/core/utils/logger';

import { type User } from '../models/user';

export const fetchUser = async (userId: number): Promise<User> => {
  try {
    const userResponse = await http.get<User>(`/users/${userId}`);
    return userResponse.data;
  } catch (error) {
    logger.error('Error fetching user:', error as Error);
    throw error;
  }
};
