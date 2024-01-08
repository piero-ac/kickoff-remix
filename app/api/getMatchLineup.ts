import { json } from "@remix-run/node";

export default async function getMatchLineup(matchId: string) {
	try {
		const url = process.env.BACKEND_URL + `match/${matchId}/lineups`;
		const response = await fetch(url);

		if (!response.ok) {
			throw json({ message: "Could not fetch match lineups" }, { status: 500 });
		}

		const lineups: Lineup[] = await response.json();
		return lineups;
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
