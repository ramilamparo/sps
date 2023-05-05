import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import clsx from "clsx";
import styles from "./NumberInput.module.scss";

export interface NumberInputProps {
	value?: number;
	onChange?: (value: number) => void;
	className?: string;
	disabled?: boolean;
}

export const NumberInput = ({
	className,
	value,
	onChange,
	disabled,
}: NumberInputProps) => {
	const [displayedValue, setDisplayedValue] = useState(value || "");

	const increment = useCallback(() => {
		if (typeof value === "number") {
			const newValue = value + 1;
			onChange?.(newValue);
			setDisplayedValue(newValue);
		}
	}, [onChange, value]);

	const decrement = useCallback(() => {
		if (typeof value === "number") {
			const newValue = value - 1;
			onChange?.(newValue);
			setDisplayedValue(newValue);
		}
	}, [onChange, value]);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setDisplayedValue(e.target.value);
			onChange?.(Number(e.target.value));
		},
		[onChange]
	);

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
				step="0.1"
				value={displayedValue}
				onChange={handleChange}
				onBlur={() => {
					if (typeof value === "number") {
						const parsedValue = parseFloat(String(displayedValue));
						const newValue = isNaN(parsedValue)
							? value
							: parsedValue;
						setDisplayedValue(newValue);
						onChange?.(newValue);
					}
				}}
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
