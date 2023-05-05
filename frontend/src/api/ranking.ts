import axios from "axios";
import { API_URL } from "../config/env";
import { PlayerModel } from "../models/PlayerModel";

export const getRankings = () =>
	axios.get<PlayerModel[]>(`${API_URL}/rankings`);
