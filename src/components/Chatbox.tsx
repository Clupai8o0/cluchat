import { useEffect, useRef, useState } from "react";

import {
	query,
	collection,
	orderBy,
	onSnapshot,
	limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
	const [messages, setMessages] = useState([]);
	const scroll = useRef(null);

	useEffect(() => {
		const q = query(
			collection(db, "messages"),
			orderBy("createdAt", "desc"),
			limit(50)
		);

		const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
			const fetchedMessages: any = [];
			QuerySnapshot.forEach((doc) => {
				fetchedMessages.push({ ...doc.data(), id: doc.id });
			});
			// const sortedMessages = fetchedMessages.sort(
			// 	(a: any, b: any) => a.createdAt - b.createdAt
			// );
			setMessages(fetchedMessages);
		});

		// return () => unsubscribe;
		return () => {
			unsubscribe;
		}
	}, []);

	return (
		<main className="mb-28 mt-24 flex justify-center px-6 md:px-12 ">
			<div className="flex flex-col-reverse gap-2 w-full max-w-7xl">
				{messages?.map((message: any) => (
					<Message key={message.id} message={message} />
				))}
			</div>
			{/* when a new message enters the chat, the screen scrolls down to the scroll div */}
			<span ref={scroll}></span>
			<SendMessage scroll={scroll} />
		</main>
	);
};

export default ChatBox;
