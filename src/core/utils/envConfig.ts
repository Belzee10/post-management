import { cleanEnv, url, testOnly } from 'envalid';

export const env = cleanEnv(import.meta.env, {
  VITE_API_URL: url({ devDefault: testOnly('https://jsonplaceholder.typicode.com') }),
});
