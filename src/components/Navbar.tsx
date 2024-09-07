import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
	const [user] = useAuthState(auth);

	const signOut = () => {
		auth.signOut();
	};

	return (
		<header className="w-full flex justify-center px-6 md:px-12 py-4">
			<nav className="max-w-7xl w-full flex items-center justify-between">
				<div></div>

				<div className="flex items-center gap-2">
					<ModeToggle />
					{user && (
						<Button onClick={signOut} variant="destructive">
							Sign Out
						</Button>
					)}
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
