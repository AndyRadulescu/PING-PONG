const CLIENT_URL = 'http://localhost:8080/api';
export const getData = async (): Promise<{ version: number }> => {
  const res = await fetch(CLIENT_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json() as { version: number };
};

export const startGame = async (roomId: String): Promise<string> => {
  const res = await fetch(`${CLIENT_URL}/addTask/${roomId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json() as string;
};

export const stopGame = async (roomId: String): Promise<Record<'canceled', boolean>> => {
  const res = await fetch(`${CLIENT_URL}/cancelTask/${roomId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json() as Record<'canceled', boolean>;
};
