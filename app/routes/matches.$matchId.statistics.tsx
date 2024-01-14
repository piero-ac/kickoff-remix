import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getMatchStatistics from "~/api/getMatchStatistics";
import MatchStat from "~/components/MatchStat";

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
	const [home, away] = statistics;
	return (
		<div className="overflow-y-scroll max-h-[390px]">
			<table className="table-auto text-center w-full">
				<tbody>
					{home.statistics.map((stat, index) => (
						<MatchStat
							key={index}
							type={stat.type}
							homeValue={stat.value}
							awayValue={away.statistics[index].value}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
