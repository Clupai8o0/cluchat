import { auth } from "@/lib/firebase";
import clsx from "clsx";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }: { message: any }) => {
	const [user] = useAuthState(auth);

	return (
		<div
			className={clsx(
				"bg-accent rounded-t-lg py-2 px-4 w-fit",
				message.uid === user?.uid
					? "!bg-foreground rounded-l-lg ml-auto text-background"
					: "rounded-r-lg"
			)}
		>
			<div>
				<p className="break-all">{message.text}</p>
			</div>
		</div>
	);
};

export default Message;
