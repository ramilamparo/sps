import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Container.module.scss";

export interface ContainerProps {
	children?: ReactNode;
	className?: string;
}

export const Container = ({
	children,
	className,
	...props
}: ContainerProps) => {
	return (
		<div {...props} className={clsx(styles.root, className)}>
			{children}
		</div>
	);
};
