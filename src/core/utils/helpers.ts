export const debounce = (callback: (value: string) => void, waitTime: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, waitTime);
  };
};
