import { useEffect, useState } from "react";

import clsx from "clsx";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [logging, setLogging] = useState(false);

	const handleLogin = () => {
		setLogging(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setLogging(false)
			})
			.catch((e) => {
				const errorCode = e.code;
				if (
					errorCode === "auth/user-not-found" ||
					errorCode === "auth/wrong-password"
				) {
					setEmailError("Wrong email or password");
					setPasswordError("Wrong email or password");
					setLogging(false);
				}
			});
	};

	useEffect(() => {
		if (emailError) setEmailError("");
		if (passwordError) setPasswordError("");
	}, [email, password]);

	return (
		<main className="w-full flex justify-center h-[80vh] items-center px-6 md:px-12">
			<form
				className="max-w-md w-full"
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
			>
				<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
					Login
				</h1>
				<div className="flex flex-col gap-2">
					<div>
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={clsx(emailError && "border-red-500 text-red-500")}
							required
						/>
						<label
							className={clsx("text-xs text-red-500", !emailError && "hidden")}
						>
							{emailError}
						</label>
					</div>

					<div>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={clsx(passwordError && "border-red-500 text-red-500")}
							required
						/>
						<label
							className={clsx(
								"text-xs text-red-500",
								!passwordError && "hidden"
							)}
						>
							{passwordError}
						</label>
					</div>

					<Button type="submit" className="mt-2" disabled={logging}>
						{logging && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Login
					</Button>
				</div>
			</form>
		</main>
	);
};

export default Login;
