import { FormEvent, useCallback, useState } from "react";
import { BasePaper } from "../Paper/BasePaper";
import { Button } from "../Button/Button";
import styles from "./ChatBox.module.scss";
import clsx from "clsx";

interface ChatHistory {
	userId: string;
	userName: string;
	message: string;
}

export interface ChatBoxProps {
	className?: string;
}

export const ChatBox = ({ className }: ChatBoxProps) => {
	const [message, setMessage] = useState("");
	const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
	const [chatHistoryContainerRef, setChatHistoryContainerRef] =
		useState<HTMLDivElement | null>(null);

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setChatHistory((history) => [
				...history,
				{
					userId: "0",
					userName: "Ram",
					message,
				},
			]);
			setMessage("");
			if (chatHistoryContainerRef) {
				setTimeout(() => {
					chatHistoryContainerRef.scrollTo(
						0,
						chatHistoryContainerRef.scrollHeight
					);
				}, 0);
			}
		},
		[chatHistoryContainerRef, message]
	);

	return (
		<BasePaper className={clsx(styles.root, className)}>
			<div
				className={styles.chatHistoryContainer}
				ref={setChatHistoryContainerRef}
			>
				{chatHistory.map((history, i) => (
					<div key={i} className={styles.chatHistoryItem}>
						<div>{history.userName}:</div>
						<div className={styles.chatHistoryMessage}>
							{history.message}
						</div>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className={styles.messageBox}>
				<input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className={styles.textInput}
				/>
				<Button className={styles.submitButton} type="submit">
					Send
				</Button>
			</form>
		</BasePaper>
	);
};
