const api = '/api/users'

export const fetchSummary = async () => {
  const response = await fetch(api);
  if (!response.ok) throw new Error('Ошибка');
  return response.json();
};