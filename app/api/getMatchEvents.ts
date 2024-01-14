import { json } from "@remix-run/node";

export default async function getMatchEvents(matchId: string) {
	try {
		const url = process.env.BACKEND_URL + `match/${matchId}/events`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch events (${response.status})`);
		}

		const events: MatchEvent[] = await response.json();
		return events;
	} catch (error: any) {
		const err = error as Error;
		console.error(err.message);

		// Handle different error scenarios and throw the appropriate JSON response
		if (err.message === "Failed to fetch events (404)") {
			throw json({ message: "Please check back later." }, { status: 404 });
		} else {
			throw json({ message: err.message }, { status: 500 });
		}
	}
}
