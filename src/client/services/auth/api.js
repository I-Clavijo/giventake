import axios from 'axios';
import { API_URL } from '../config';

export const login = async (data) => await axios.post(`${API_URL}/login`, data);

export const signup = async (data) => await axios.post(`${API_URL}/signup`, data);