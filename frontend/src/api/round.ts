import axios from "axios";
import { API_URL } from "../config/env";
import { RoundModel } from "../models/RoundModel";

export const createRound = (players: string[]) =>
	axios.post<RoundModel>(`${API_URL}/rounds`, { players });

export const betRound = (
	roundId: number,
	bets: Array<{ bet: number; guess: number; player: string }>
) =>
	axios.post<{ round: RoundModel; number: number }>(
		`${API_URL}/rounds/${roundId}/bet`,
		{ bets }
	);
