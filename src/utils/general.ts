export const formatDecimalNumber = (data: number | string, decimals: number) => {
  const num = Number(data);

  if (num % 1 === 0) {
    return num;
  } else {
    return Number(num.toFixed(decimals));
  }
};
