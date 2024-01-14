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
	const [home, away] = statistics;
	return (
		<div className="overflow-scroll max-h-[390px]">
			<table className="table-auto text-center w-full">
				<tbody>
					{home.statistics.map((stat, index) => {
						return (
							<>
								<tr>
									<th colSpan={2}>{stat.type}</th>
								</tr>
								<tr>
									<td>{stat.value || 0}</td> {/*Home Value */}
									<td>{away.statistics[index].value || 0}</td> {/*Home Value */}
								</tr>
							</>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
