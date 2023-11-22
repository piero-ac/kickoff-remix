import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLeagueInfo } from "utils/api-football-functions";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	if (params.leagueId === undefined) {
		throw json({ message: "Missing league id" }, { status: 400 });
	}

	if (!["39", "140", "78"].includes(params.leagueId)) {
		throw json({ message: "Invalid league id" }, { status: 400 });
	}

	const leagueInfoArray: League[] = await getLeagueInfo(params.leagueId);
	const leagueInfo = leagueInfoArray[0];
	return json({ leagueInfo });
};

export default function LeaguePage() {
	const { leagueInfo } = useLoaderData<typeof loader>();

	return <div>{leagueInfo.league.name}</div>;
}
