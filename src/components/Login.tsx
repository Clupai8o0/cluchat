import { useEffect, useState } from "react";

import clsx from "clsx";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential);
			})
			.catch((e) => {
				const errorCode = e.code;
				if (
					errorCode === "auth/user-not-found" ||
					errorCode === "auth/wrong-password"
				) {
					setEmailError("Wrong email or password");
					setPasswordError("Wrong email or password");
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

					<Button type="submit" className="mt-2">
						Login
					</Button>
				</div>
			</form>
		</main>
	);
};

export default Login;
