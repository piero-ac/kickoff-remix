import { json } from "@remix-run/node";

export default async function getMatchEvents(matchId: string) {
	try {
		const url = process.env.BACKEND_URL + `match/${matchId}/events`;
		const response = await fetch(url);

		if (!response.ok) {
			throw json({ message: "Could not fetch match events" }, { status: 500 });
		}

		const events: Event[] = await response.json();
		return events;
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
