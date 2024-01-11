import { json } from "@remix-run/node";

export default async function getMatchStatistics(matchId: string) {
	try {
		const url = process.env.BACKEND_URL + `match/${matchId}/statistics`;
		const response = await fetch(url);

		if (!response.ok) {
			throw json(
				{ message: "Could not fetch match statistics" },
				{ status: 500 }
			);
		}

		const statistics: Statistic[] = await response.json();
		return statistics;
	} catch (error: any) {
		const err = error as Error;
		console.error(err.message);
		throw json(
			{
				message: err.message,
			},
			{ status: 500 }
		);
	}
}
