import { json } from "@remix-run/node";

export default async function getTodaysMatches(
	leagueId: number,
	season: string,
	date: string
) {
	try {
		const url =
			process.env.BACKEND_URL + `matches/${leagueId}/${season}/${date}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw json(
				{ message: "Could not fetch today's fixtures" },
				{ status: 500 }
			);
		}

		// No Matches today
		if (response.status === 204) {
			return [];
		}

		const matches: Match[] = await response.json();
		return matches;
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
