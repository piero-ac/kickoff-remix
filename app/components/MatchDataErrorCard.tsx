const ErrorCard = ({
	title,
	message,
	statusCode,
}: {
	title: string;
	message: string | null;
	statusCode?: number;
}) => {
	let messageByStatus =
		statusCode === 404
			? "Please check back later."
			: statusCode === 500
			? "Server is down."
			: message;

	return (
		<div className="cyan-gradient text-brightwhite text-center flex flex-col items-center justify-center h-full">
			<h2 className="text-2xl font-bold  uppercase w-full">{title}</h2>
			<p>{messageByStatus}</p>
		</div>
	);
};

export default ErrorCard;
