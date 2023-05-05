export abstract class BotHelper {
	public static generateGuess() {
		return Math.round(Math.random() * 100 * 10) / 100;
	}
	public static generateBet(max: number) {
		return Math.round(Math.random() * max);
	}
}
