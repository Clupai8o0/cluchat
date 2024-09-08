import { useState } from "react";

import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SendMessage = ({ scroll }: { scroll: any }) => {
	const [message, setMessage] = useState("");
	const [sendingMessage, setSendingMessage] = useState(false);

	const sendMessage = async (event: any) => {
		event.preventDefault();
		setSendingMessage(true);
		if (message.trim() === "") {
			alert("Enter valid message");
			return;
		}

		const { uid, displayName, photoURL } = auth.currentUser || {};
		await addDoc(collection(db, "messages"), {
			text: message,
			name: displayName,
			avatar: photoURL,
			createdAt: serverTimestamp(),
			uid,
		});
		setMessage("");
		scroll.current.scrollIntoView({ behavior: "smooth" });
		setSendingMessage(false);
	};

	return (
		<form
			onSubmit={(event) => sendMessage(event)}
			className="fixed bottom-0 left-0 px-6 md:px-12 py-6 bg-background flex justify-center w-full border-t border-foreground"
		>
			<div className="flex gap-2 w-full max-w-7xl">
				<Input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="bg-accent"
					placeholder="Send message..."
				/>
				<Button type="submit" variant="default" disabled={sendingMessage}>
					{sendingMessage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Send
				</Button>
			</div>
		</form>
	);
};

export default SendMessage;
