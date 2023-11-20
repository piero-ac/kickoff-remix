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
			<div className="absolute inset-0 z-0">
				<div className="bg-[url('/img/soccer-pitch-sky.jpg')] bg-cover bg-center w-full h-full"></div>
			</div>
			<div className="absolute inset-0 bg-green-600 opacity-50 z-10"></div>
		</div>
	);
}
