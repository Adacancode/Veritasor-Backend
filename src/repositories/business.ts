export interface Business {
  id: string;
  userId: string;
  name: string;
  email: string;
  industry?: string;
  description?: string;
  website?: string;
  createdAt: string;
}

const businesses: Business[] = [
  {
    id: "biz_1",
    userId: "user_1",
    name: "Business 1",
    email: "business1@example.com",
    createdAt: "2025-10-01T12:00:00.000Z",
  },
  {
    id: "biz_2",
    userId: "user_2",
    name: "Business 2",
    email: "business2@example.com",
    createdAt: "2025-10-01T12:00:00.000Z",
  },
];

export const businessRepository = {
  getAll: () => businesses,

  findByUserId: (userId: string) =>
    businesses.find((b) => b.userId === userId) ?? null,

  findById: (id: string) =>
    businesses.find((b) => b.id === id) ?? null,

  create: (data: Omit<Business, 'id' | 'createdAt'>): Business => {
    const business: Business = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    businesses.push(business);
    return business;
  },

  update: (id: string, data: Partial<Business>): Business | null => {
    const idx = businesses.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    businesses[idx] = { ...businesses[idx], ...data };
    return businesses[idx];
  },
};