import { RoundPlayerModel } from "./RoundPlayerModel";

export interface PlayerModel {
	id: number;
	username: string;
	RoundPlayer: RoundPlayerModel;
	score: number;
}
