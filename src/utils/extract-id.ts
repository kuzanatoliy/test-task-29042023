export const extractIdFromUrl = (str: string) => {
  const arr = str.split('/');
  return arr[arr.length - 2];
};
