import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getMatchStatistics from "~/api/getMatchStatistics";

export async function loader({ params }: LoaderFunctionArgs) {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	const statistics = await getMatchStatistics(matchId);
	return json({ statistics });
}

export default function LineupPage() {
	const { statistics } = useLoaderData<typeof loader>();
	return <div>Statistics</div>;
}
