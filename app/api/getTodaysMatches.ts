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

		const matches = await response.json();
		return matches;
	} catch (error: any) {
		if (error instanceof Error) console.error(error.message);
		throw json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
}
