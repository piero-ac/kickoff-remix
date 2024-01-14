import { json } from "@remix-run/node";

export default async function getMatchStatistics(matchId: string) {
	try {
		const url = process.env.BACKEND_URL + `match/${matchId}/statistics`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch statistics (${response.status})`);
		}
		const statistics: Statistic[] = await response.json();
		return statistics;
	} catch (error: any) {
		const err = error as Error;
		console.error(err.message);

		// Handle different error scenarios and throw the appropriate JSON response
		if (err.message === "Failed to fetch statistics (404)") {
			throw json({ message: "Please check back later." }, { status: 404 });
		} else {
			throw json({ message: err.message }, { status: 500 });
		}
	}
}
