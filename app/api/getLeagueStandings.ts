import { json } from "@remix-run/node";

export default async function getLeagueStandings(
	leagueId: string,
	season: string
) {
	try {
		const response = await fetch(
			process.env.BACKEND_URL + `standings/${leagueId}/${season}`
		);
		if (!response.ok) {
			throw new Error("Could not fetch standings");
		}

		const result: Standings = await response.json();
		return result;
	} catch (error: any) {
		const err = error as Error;
		throw json(
			{
				message: err.message,
			},
			{ status: 500 }
		);
	}
}
