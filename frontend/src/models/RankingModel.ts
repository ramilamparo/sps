export interface RankingModel {
	rank: number;
	name: string;
	score: number;
}

export const FAKE_RANKING: RankingModel[] = [
	{ rank: 1, name: "Ram", score: 300 },
	{ rank: 2, name: "Raf", score: 200 },
	{ rank: 3, name: "Rok", score: 100 },
];
