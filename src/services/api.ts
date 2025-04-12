import axios from 'axios';
import { Question } from '../types';

const API_URL = 'http://localhost:3001/questions';

export const fetchQuestions = async (): Promise<Question[]> => {
  const res = await axios.get<Question[]>(API_URL);
  return res.data;
};
 
