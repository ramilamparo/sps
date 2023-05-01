import { useMemo } from "react";
import { FAKE_RANKING, RankingModel } from "../../models/RankingModel";
import { BasePaper } from "../Paper/BasePaper";
import { Table, TableColumns } from "./Table";

export const RankingTable = () => {
	const paddedRanking = useMemo(() => {
		const rankings = [...FAKE_RANKING];
		const MIN_LENGTH = 5;

		for (let i = rankings.length; i < MIN_LENGTH; i++) {
			rankings.push({
				name: "-",
				rank: 0,
				score: 0,
			});
		}
		return rankings;
	}, []);

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
