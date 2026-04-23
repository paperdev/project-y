
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};

function formatNumber(num: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
}

export { 
  formatDate,
  formatNumber
};
