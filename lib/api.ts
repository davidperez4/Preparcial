const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Actor {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
}

export const actorApi = {
  async getActors(): Promise<Actor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/actors`);
      if (!response.ok) throw new Error('Failed to fetch actors');
      return await response.json();
    } catch (error) {
      console.error('Error fetching actors:', error);
      throw error;
    }
  },

  async getActorById(id: string): Promise<Actor> {
    try {
      const response = await fetch(`${API_BASE_URL}/actors/${id}`);
      if (!response.ok) throw new Error('Failed to fetch actor');
      return await response.json();
    } catch (error) {
      console.error('Error fetching actor:', error);
      throw error;
    }
  },

  async createActor(actor: Omit<Actor, 'id'>): Promise<Actor> {
    try {
      const response = await fetch(`${API_BASE_URL}/actors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actor),
      });
      if (!response.ok) throw new Error('Failed to create actor');
      return await response.json();
    } catch (error) {
      console.error('Error creating actor:', error);
      throw error;
    }
  },

  async updateActor(id: string, actor: Partial<Actor>): Promise<Actor> {
    try {
      const response = await fetch(`${API_BASE_URL}/actors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actor),
      });
      if (!response.ok) throw new Error('Failed to update actor');
      return await response.json();
    } catch (error) {
      console.error('Error updating actor:', error);
      throw error;
    }
  },

  async deleteActor(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/actors/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete actor');
    } catch (error) {
      console.error('Error deleting actor:', error);
      throw error;
    }
  },
};
