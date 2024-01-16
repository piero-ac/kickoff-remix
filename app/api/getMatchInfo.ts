import { json } from "@remix-run/node";
type MatchError = { title: string; message: string };

export default async function getMatchInfo(matchId: string) {
	try {
		const url = process.env.BACKEND_URL + `match/${matchId}`;
		const response = await fetch(url);

		if (!response.ok) {
			const error: MatchError = await response.json();
			throw new Error(`${error.title}-${error.message}`);
		}

		const match: Match = await response.json();
		return match;
	} catch (error: any) {
		const err = error as Error;
		const [title, message] = err.message.split("-");
		throw json({ title, message }, { status: 400 });
	}
}
