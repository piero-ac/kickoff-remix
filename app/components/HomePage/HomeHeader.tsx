export default function HomeHeader() {
	return (
		<header className="mt-5 mb-5 h-[150px] md:h-[200px] cyan-gradient flex flex-col sm:flex-row justify-center items-center">
			<h1 className=" text-brightwhite font-bold text-5xl md:text-7xl ">
				Premier League
			</h1>
			<img
				src="/img/premierleague-logo.png"
				className="h-[50px] w-[50px] md:h-[120px] md:w-[120px]"
				alt="Premier League Logo"
			/>
		</header>
	);
}
