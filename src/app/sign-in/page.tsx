import SignInForm from "@/components/SignInForm/SignInForm";
import { getCsrfToken } from "next-auth/react";

export default async function SignIn() {
	// Get CSRF from next-auth
	const csrfToken = await getCsrfToken();

	if (!csrfToken) {
		throw new Error("Error requesting CSRF token");
	}

	return <SignInForm csrfToken={csrfToken} />;
}
