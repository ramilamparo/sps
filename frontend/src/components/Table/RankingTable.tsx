import { useEffect, useMemo, useState } from "react";
import { RankingModel } from "../../models/RankingModel";
import { BasePaper } from "../Paper/BasePaper";
import { Table, TableColumns } from "./Table";
import { useAppSelector } from "../../redux";
import { useDebounce } from "../../hooks/useDebounce";
import { PlayerModel } from "../../models/PlayerModel";
import { getRankings } from "../../api/ranking";

export const RankingTable = () => {
	const currentRound = useAppSelector((state) => state.round.currentRound);
	const debouncedCurrentRound = useDebounce(currentRound, 500);
	const [rankings, setRankings] = useState<PlayerModel[]>([]);

	const paddedRanking = useMemo(() => {
		const paddedRanking: RankingModel[] = rankings.map((ranking, i) => {
			return {
				name: ranking.username,
				rank: i + 1,
				score: ranking.score,
			};
		});
		const MIN_LENGTH = 5;

		for (let i = rankings.length; i < MIN_LENGTH; i++) {
			paddedRanking.push({
				name: "-",
				rank: 0,
				score: 0,
			});
		}
		return paddedRanking;
	}, [rankings]);

	useEffect(() => {
		getRankings().then(({ data }) => setRankings(data));
	}, [debouncedCurrentRound]);

	return (
		<BasePaper>
			<Table
				data={paddedRanking}
				columns={RANKING_TABLE_COLUMNS}
				keyExtract={keyExtract}
			/>
		</BasePaper>
	);
};

const keyExtract = (data: RankingModel, index: number) => data.name + index;

const RANKING_TABLE_COLUMNS: TableColumns<RankingModel>[] = [
	{ field: "rank", label: "No", render: (data) => <>{data.rank || "-"}</> },
	{ field: "name", label: "Name", render: (data) => <>{data.name}</> },
	{
		field: "score",
		label: "Score",
		render: (data) => <>{data.score || "-"}</>,
	},
];
