import MatchesHeader from "./MatchesHeader";
import MatchSelectButton from "../MatchSelectButton";
export default function MatchesError({
	title,
	message,
}: {
	title: string;
	message: string;
}) {
	return (
		<div className="my-1">
			<MatchesHeader />
			<main className="max-w-[1024px] mx-auto flex flex-col md:flex-row gap-2 md:gap-0 items-center md:items-start px-1">
				{/* Match Selection */}
				<section className="w-[350px] h-[300px] md:h-[630px] sm:w-[416px] md:w-[375px] flex flex-col shadow-lg">
					{/* Options to filter matches */}
					<div className="w-full flex flex-row justify-between bg-darkpurple">
						<MatchSelectButton text="Today" />
						<MatchSelectButton text="Upcoming" />
						<MatchSelectButton text="Past" />
					</div>
					{/* Matches to select*/}
					<div className="rounded-sm bg-brightwhite grow flex items-center">
						<p className="text-slate-500 text-5xl font-semibold uppercase text-center">
							No matches available
						</p>
					</div>
				</section>
				{/* Match View  */}
				<section className="w-[350px] sm:w-[416px] md:w-auto grow shadow-lg md:h-[630px] h-full cyan-gradient flex flex-col items-center justify-center text-brightwhite min-h-[200px]">
					<p className="text-3xl font-bold">{title}</p>
					<p>{message}</p>
				</section>
			</main>
		</div>
	);
}
