import { json } from "@remix-run/node";

export default async function getTodaysMatches(
	leagueId: number,
	season: string
) {
	try {
		const url =
			process.env.BACKEND_URL + `matches/machdates/${leagueId}/${season}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw json({ message: "Could not fetch matchdates" }, { status: 500 });
		}

		const matchdates: String[] = await response.json();
		return matchdates;
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
