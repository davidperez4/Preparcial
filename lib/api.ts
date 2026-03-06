const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Actor {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
}

export interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
  director?: {
    id: string;
    name: string;
    photo: string;
    nationality: string;
    birthDate: string;
    biography: string;
  };
  actors?: Actor[];
  genre?: {
    id: string;
    type: string;
  };
  platforms?: {
    id: string;
    name: string;
    url: string;
  }[];
  reviews?: {
    id: string;
    text: string;
    score: number;
    creator: string;
  }[];
  youtubeTrailer?: {
    id: string;
    name: string;
    url: string;
    duration: number;
    channel: string;
  };
}

export interface Prize {
  id: string;
  name: string;
  description?: string;
  // agregar más campos si necesarios
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

export const movieApi = {
  async getMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      return await response.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  async getMovieById(id: string): Promise<Movie> {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`);
      if (!response.ok) throw new Error('Failed to fetch movie');
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  },

  async createMovie(movie: Omit<Movie, 'id'>): Promise<Movie> {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', response.status, errorText);
        throw new Error(`Failed to create movie: ${response.status} ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  },

  async assignMovieToActor(actorId: string, movieId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/actors/${actorId}/movies/${movieId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to assign movie to actor');
    } catch (error) {
      console.error('Error assigning movie to actor:', error);
      throw error;
    }
  },

  async assignPrizeToMovie(movieId: string, prizeId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${movieId}/prizes/${prizeId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to assign prize to movie');
    } catch (error) {
      console.error('Error assigning prize to movie:', error);
      throw error;
    }
  },
};

export const prizeApi = {
  async createPrize(prize: Omit<Prize, 'id'>): Promise<Prize> {
    try {
      const response = await fetch(`${API_BASE_URL}/prizes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prize),
      });
      if (!response.ok) throw new Error('Failed to create prize');
      return await response.json();
    } catch (error) {
      console.error('Error creating prize:', error);
      throw error;
    }
  },
};
