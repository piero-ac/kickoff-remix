import { json } from "@remix-run/node";

export default async function getMatchInfo(matchId: string) {
	try {
		const url = process.env.BACKEND_URL + `match/${matchId}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw json({ message: "Could not fetch match" }, { status: 500 });
		}

		const match: Match = await response.json();
		return match;
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
