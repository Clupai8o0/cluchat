import { auth } from "./lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import NavBar from "./components/Navbar";
import ChatBox from "./components/Chatbox";
import Login from "./components/Login";

import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
	const [user] = useAuthState(auth);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="relative">
				<NavBar />
				{!user ? <Login /> : <ChatBox />}
			</div>
		</ThemeProvider>
	);
}

export default App;
