import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Kickoff" },
		{
			name: "description",
			content: "Stay up to date with your favorite leagues and teams.",
		},
	];
};

export default function Index() {
	return (
		<div className="relative w-screen h-screen">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<div className="bg-[url('/img/soccer-pitch-sky.jpg')] bg-cover bg-center w-full h-full"></div>
			</div>
			{/* Content */}
			<div className="absolute inset-0 z-20 mt-14">
				<div className="text-white flex flex-col text-center items-center">
					<h1 className="hidden md:block text-lime-500 font-bold text-9xl italic mb-5">
						Kick⚽ff
					</h1>
					<p className="text-3xl sm:text-4xl sm:w-[400px] md:text-5xl font-semibold text-lime-100 md:w-[500px]">
						View <span className="green-gradient ">Matches</span>,
						<span className="green-gradient"> Scores</span>, and
						<span className="green-gradient"> Statistics</span>!
					</p>
					<div className="mt-3 md:mt-5 text-4xl md:text-6xl green-gradient">
						&#x21e3;
					</div>
					<div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-4 w-[1000px] border border-black">
						<div>
							<h2>Premier League</h2>
						</div>
						<div>
							<h2>La Liga</h2>
						</div>
						<div>
							<h2>Bundesliga</h2>
						</div>
					</div>
				</div>
			</div>
			{/* Overlay */}
			<div className="absolute inset-0 bg-green-600 opacity-50 z-10"></div>
		</div>
	);
}
