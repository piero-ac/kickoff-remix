const LeagueInfo = ({ leagueInfo }: { leagueInfo: LeagueInfo }) => {
	return (
		<div className="flex flex-row items-center h-[75px] justify-between">
			<h1 className="text-2xl md:text-4xl text-bold uppercase">
				{leagueInfo.name}
			</h1>
			{leagueInfo.logo && (
				<div className="bg-slate-100 rounded-sm">
					<img
						src={leagueInfo.logo}
						alt={`Logo of ${leagueInfo.name}`}
						height="50px"
						width="50px"
					/>
				</div>
			)}
		</div>
	);
};

export default LeagueInfo;
