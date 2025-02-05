<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchPosts, fetchAuthor } from '../../services/post.service';
import { type Post } from '../../models';
import logger from '@/core/utils/logger';
import List from '@/core/components/list/List.vue';

interface PostState extends Post {
  author: string;
}

const error = ref<string>('');
const laoding = ref<boolean>(false);

const posts = ref<PostState[]>([]);

const getPosts = async (): Promise<void> => {
  try {
    laoding.value = true;

    const postsData = await fetchPosts();
    logger.info(`PostsView: Posts fetched successfully`);

    const userIds = new Set(postsData.map((post) => post.userId));
    const authors = await Promise.all(Array.from(userIds).map((userId) => fetchAuthor(userId)));
    logger.info(`PostsView: Authors fetched successfully`);

    const authorMap = new Map(authors.map((author) => [author.id, author.name]));

    const data = postsData.map((post) => ({
      ...post,
      author: authorMap.get(post.userId) || 'Unknown',
    }));

    posts.value = data;
  } catch (err) {
    const errorMsg = 'Failed to fetch posts';

    error.value = errorMsg;
    logger.error(`PostsView: ${errorMsg}`, err as Error);
  } finally {
    laoding.value = false;
  }
};

const mappedPosts = computed(() => {
  return posts.value.map(({ id, title, body, author }) => {
    return {
      id: id,
      title: title,
      description: body,
      author,
    };
  });
});

onMounted(() => {
  getPosts();
});
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="shrink p-4">Posts page</div>
    <div class="grow h-full overflow-hidden">
      <List :headers="['id', 'title', 'body']" :rows="mappedPosts">
        <template #author="{ row }">
          {{ row.author }}
        </template>
      </List>
    </div>
  </div>
</template>
