import { API_URL } from "../constants/dragonBallConstants";
import { Character } from "../types/dragonBallType";


export const fetchCharactersWithPagination = async (type: string, query: string, page: number, limit: number): Promise<Character[]> => {
  const response = await fetch(`${API_URL}?${type}=${query}&page=${page}&limit=${limit}`);
  const data = await response.json();
  return data.flat();
};

export const fetchAllCharactersWithPagination = async (page: number, limit: number): Promise<Character[]> => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data.items;
};