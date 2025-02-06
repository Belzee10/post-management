import { http } from '@/core/services/http';
import logger from '@/core/utils/logger';

import { type Post } from '../models';

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const postsResponse = await http.get<Post[]>('/posts');
    return postsResponse.data;
  } catch (error) {
    logger.error('Error fetching posts:', error as Error);
    throw error;
  }
};
