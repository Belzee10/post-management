import { http } from '@/core/services/http';
import logger from '@/core/utils/logger';

import { type Post } from '../models';

export const fetchPosts = async (params?: Record<string, string>): Promise<Post[]> => {
  try {
    const postsResponse = await http.get<Post[]>('/posts', {
      params,
    });
    return postsResponse.data;
  } catch (error) {
    logger.error('Error fetching posts:', error as Error);
    throw error;
  }
};
