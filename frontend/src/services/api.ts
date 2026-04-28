export const apiGet = async (endpoint: string): Promise<any> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }
  return response.json();
};

export const apiPost = async (endpoint: string, data: any): Promise<any> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`/api${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to post ${endpoint}: ${response.status}`);
  }
  return response.json();
};

export const apiPatch = async (endpoint: string, data: any): Promise<any> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`/api${endpoint}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to patch ${endpoint}: ${response.status}`);
  }
  return response.json();
};
