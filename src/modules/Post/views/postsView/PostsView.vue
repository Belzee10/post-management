<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { fetchPosts } from '../../services/post.service';
import { fetchUser } from '@/core/services/user.service';
import { type Post } from '../../models';
import { debounce } from '@/core/utils/helpers';
import logger from '@/core/utils/logger';

import List from '@/core/components/list/List.vue';
import ErrorBanner from '@/core/components/errorBanner/ErrorBanner.vue';
import SearchInput from '@/core/components/searchInput/SearchInput.vue';

interface PostState extends Post {
  author: string;
}

const error = ref<string>('');
const loading = ref<boolean>(false);

const posts = ref<PostState[]>([]);

const searchValue = ref('');

const debouncedSearch = debounce((value: string) => {
  getPosts(value);
}, 300);

watch(searchValue, (newValue) => {
  debouncedSearch(newValue);
});

const getPosts = async (query?: string): Promise<void> => {
  try {
    loading.value = true;

    const postsData = await fetchPosts({ title_like: query || '' });
    logger.info(`PostsView: Posts fetched successfully`);

    const userIds = new Set(postsData.map((post) => post.userId));
    const users = await Promise.all(Array.from(userIds).map((userId) => fetchUser(userId)));
    logger.info(`PostsView: Users fetched successfully`);

    const userMap = new Map(users.map((user) => [user.id, user.name]));

    const data = postsData.map((post) => ({
      ...post,
      author: userMap.get(post.userId) || 'Unknown',
    }));

    posts.value = data;
  } catch (err) {
    const errorMsg = 'Failed to fetch posts';

    error.value = errorMsg;
    logger.error(`PostsView: ${errorMsg}`, err as Error);
  } finally {
    loading.value = false;
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
  <div data-test="error-message" v-if="error" class="flex justify-center">
    <ErrorBanner :message="error" />
  </div>

  <div v-else class="h-full flex flex-col">
    <div class="shrink py-4 flex">
      <div class="grow">
        <SearchInput
          :value="searchValue"
          placeholder="Search for post..."
          @update:value="(value) => (searchValue = value)"
        />
      </div>
      <div class="shrink">Action buttons</div>
    </div>
    <div class="grow h-full overflow-hidden">
      <div data-test="loading" class="flex justify-center" v-if="loading">Loading posts...</div>
      <List v-else :headers="['id', 'title', 'body']" :rows="mappedPosts">
        <template #author="{ row }">
          {{ row.author }}
        </template>
      </List>
    </div>
  </div>
</template>
