import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	return json({ matchId });
}

export default function MatchInformation() {
	const { matchId } = useLoaderData<typeof loader>();
	return <div>{matchId}</div>;
}
