import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getLeagueMatches from "~/api/getLeagueMatches";
import MatchSelectButton from "~/components/MatchSelectButton";
import { getDate } from "utils/datetime-functions";
import { useState } from "react";
import MatchSelectCard from "~/components/MatchSelectCard";

export const loader = async () => {
	const matches: Match[] = await getLeagueMatches("39", "2023");
	return json({ matches });
};

export default function Matches() {
	const { matches } = useLoaderData<typeof loader>();
	const [displayedMatches, setDisplayedMatches] = useState<{
		typeOfMatches: "upcoming" | "past" | "today";
		matches: Match[];
	}>({ typeOfMatches: "today", matches: [] });
	const today = getDate();

	const todaysMatches = matches.filter(
		(match) => match.fixture.date.substring(0, 10) === today
	);

	const pastMatches = matches
		.filter(
			(match) =>
				// includes matches for today and before today and that have completed. And matches that have already been completed
				(match.fixture.date.substring(0, 10) <= today &&
					match.fixture.status.short === "FT") ||
				match.fixture.status.short === "FT" ||
				match.fixture.date.substring(0, 10) < today
		)
		.sort(
			(a, b) =>
				(new Date(b.fixture.date) as any) - (new Date(a.fixture.date) as any)
		);

	const upcomingMatches = matches
		.filter(
			(match) =>
				// includes matches after today or matches that still have NS (such as delayed matches)
				match.fixture.date.substring(0, 10) > today ||
				match.fixture.status.short === "NS"
		)
		.sort(
			(a, b) =>
				(new Date(a.fixture.date) as any) - (new Date(b.fixture.date) as any)
		);

	return (
		<div className="my-1">
			<header className="mt-5 mb-5 h-[150px] md:h-[200px] cyan-gradient flex flex-row justify-center items-center">
				<h1 className=" text-brightwhite font-bold text-5xl md:text-7xl">
					Matches
				</h1>
			</header>
			<main className="border max-w-[1024px] mx-auto flex flex-row gap-1">
				{/* Match Selection */}
				<section className="w-[400px] border border-blue-500 flex flex-col">
					{/* Options to filter matches */}
					<div className="w-full flex flex-row justify-between bg-darkpurple">
						<MatchSelectButton
							text="Today"
							selected={displayedMatches.typeOfMatches === "today"}
							onClick={() =>
								setDisplayedMatches({
									typeOfMatches: "today",
									matches: todaysMatches,
								})
							}
						/>
						<MatchSelectButton
							text="Upcoming"
							selected={displayedMatches.typeOfMatches === "upcoming"}
							onClick={() =>
								setDisplayedMatches({
									typeOfMatches: "upcoming",
									matches: upcomingMatches,
								})
							}
						/>
						<MatchSelectButton
							text="Past"
							selected={displayedMatches.typeOfMatches === "past"}
							onClick={() =>
								setDisplayedMatches({
									typeOfMatches: "past",
									matches: pastMatches,
								})
							}
						/>
					</div>
					{/* Matches to select*/}
					<div className="rounded-sm bg-brightwhite grow overflow-scroll max-h-[460px] px-1">
						{displayedMatches.matches.length === 0 && (
							<p className="text-slate-500 text-5xl font-semibold uppercase text-center flex items-center h-full">
								No matches available
							</p>
						)}
						{displayedMatches.matches.length > 0 &&
							displayedMatches.matches.map((match) => (
								<MatchSelectCard
									key={match.fixture.id}
									match={match}
									type={displayedMatches.typeOfMatches}
								/>
							))}
					</div>
				</section>
				{/* Match View  */}
				<section className="border border-red-100 grow"></section>
			</main>
		</div>
	);
}
