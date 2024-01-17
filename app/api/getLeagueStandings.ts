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
			const { title, message } = await response.json();
			throw new Error(`${title}-${message}`);
		}

		const result: Standings = await response.json();
		return result;
	} catch (error: any) {
		const err = error as Error;
		if (err.name === "FetchError") {
			throw json(
				{
					title: "Server is down",
					message: "Check back later",
				},
				{ status: 500 }
			);
		}
		const [title, message] = err.message.split("-");
		throw json(
			{
				title,
				message,
			},
			{ status: 400 }
		);
	}
}
