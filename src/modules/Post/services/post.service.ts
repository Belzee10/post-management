import { http } from '@/core/services/http';
import logger from '@/core/utils/logger';

import { type Post, type User } from '../models';

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const postsResponse = await http.get<Post[]>('/posts');
    return postsResponse.data;
  } catch (error) {
    logger.error('Error fetching posts:', error as Error);
    throw error;
  }
};

export const fetchAuthor = async (userId: number): Promise<User> => {
  try {
    const authorResponse = await http.get<User>(`/users/${userId}`);
    return authorResponse.data;
  } catch (error) {
    logger.error('Error fetching author:', error as Error);
    throw error;
  }
};
