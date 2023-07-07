export default function Page({
	params
}: {
	params: {
		quizId: string
	}
}) {
	console.log(params);
	return (
		<div>{params.quizId}</div>
	);
}
