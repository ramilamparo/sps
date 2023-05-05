import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import clsx from "clsx";
import styles from "./NumberInput.module.scss";

export interface NumberInputProps {
	value?: number;
	onChange?: (value: number) => void;
	className?: string;
	disabled?: boolean;
	allowFloatingPoint?: boolean;
	step?: number;
	min?: number;
	max?: number;
}

export const NumberInput = ({
	className,
	value,
	onChange,
	disabled,
	allowFloatingPoint,
	step = 1,
	min,
	max,
}: NumberInputProps) => {
	const [displayedValue, setDisplayedValue] = useState(value || "");

	const clampNumber = useCallback(
		(number: number) => {
			if (min !== undefined && number < min) {
				return min;
			}
			if (max !== undefined && number > max) {
				return max;
			}
			return number;
		},
		[max, min]
	);

	const increment = useCallback(() => {
		if (typeof value === "number") {
			const newValue = clampNumber(value + 1);
			onChange?.(newValue);
			setDisplayedValue(newValue);
		}
	}, [clampNumber, onChange, value]);

	const decrement = useCallback(() => {
		if (typeof value === "number") {
			const newValue = clampNumber(value - 1);
			onChange?.(newValue);
			setDisplayedValue(newValue);
		}
	}, [clampNumber, onChange, value]);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setDisplayedValue(e.target.value);
	}, []);

	const handleBlur = useCallback(() => {
		const isNumber = /^-?\d+(\.\d+)?$/.test(String(displayedValue));
		const parsedValue = parseFloat(String(displayedValue));
		if (isNumber && !isNaN(parsedValue)) {
			const newValue = clampNumber(
				allowFloatingPoint ? parsedValue : Math.round(parsedValue)
			);
			setDisplayedValue(newValue);
			onChange?.(newValue);
		} else {
			setDisplayedValue(clampNumber(value ?? 0));
		}
	}, [allowFloatingPoint, clampNumber, displayedValue, onChange, value]);

	useEffect(() => {
		if (typeof value === "number") {
			setDisplayedValue(value?.toString());
		}
	}, [value]);

	return (
		<div className={clsx(styles.root, className)}>
			<button
				disabled={disabled}
				className={styles.button}
				onClick={decrement}
			>
				<MdArrowDropDown />
			</button>
			<input
				disabled={disabled}
				className={styles.input}
				type="text"
				inputMode="numeric"
				step={step}
				value={displayedValue}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<button
				disabled={disabled}
				className={styles.button}
				onClick={increment}
			>
				<MdArrowDropUp />
			</button>
		</div>
	);
};
