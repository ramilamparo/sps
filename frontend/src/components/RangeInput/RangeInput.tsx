import { ReactNode, useMemo } from "react";
import styles from "./RangeInput.module.scss";
import clsx from "clsx";

export interface RangeInputProps {
	min: number;
	max: number;
	step: number;
	value?: number;
	onChange?: (value: number) => void;
}

export const RangeInput = ({
	min,
	max,
	step,
	value,
	onChange,
}: RangeInputProps) => {
	const labels = useMemo(() => {
		const nodes: ReactNode[] = [];
		for (let i = min; i <= max; i += step) {
			const isActive = value ? i <= value : false;
			nodes.push(
				<span key={i} className={clsx(isActive && styles.labelActive)}>
					{i}x
				</span>
			);
		}
		return nodes;
	}, [max, min, step, value]);

	return (
		<div className={styles.root}>
			<input
				className={styles.input}
				type="range"
				min={min}
				max={max}
				step={step}
				onChange={(e) => onChange?.(Number(e.target.value))}
			/>
			<div className={styles.labelContainer}>{labels}</div>
		</div>
	);
};
