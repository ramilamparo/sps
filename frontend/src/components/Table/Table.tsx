import { ReactNode, useMemo } from "react";
import styles from "./Table.module.scss";

export interface TableColumns<T> {
	render: (data: T) => ReactNode;
	field: string;
	label: string;
}

export interface TableProps<T> {
	columns: TableColumns<T>[];
	data: T[];
	keyExtract: (data: T, index: number) => string | number;
}

export const Table = <T,>({ columns, data, keyExtract }: TableProps<T>) => {
	const headers = useMemo(() => {
		return (
			<tr>
				{columns.map((col) => {
					return <th key={col.field}>{col.label}</th>;
				})}
			</tr>
		);
	}, [columns]);

	const body = useMemo(() => {
		return data.map((data, i) => {
			return (
				<tr key={keyExtract(data, i)}>
					{columns.map((col, i) => (
						<td key={i}>{col.render(data)}</td>
					))}
				</tr>
			);
		});
	}, [columns, data, keyExtract]);

	return (
		<table className={styles.root}>
			<thead>{headers}</thead>
			<tbody>{body}</tbody>
		</table>
	);
};
