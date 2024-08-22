import WPAPI from "wpapi";

if (!process.env.WORDPRESS_API_URL) {
	throw new Error("WORDPRESS_API_URL is not set");
}

const wordpress = new WPAPI({
	endpoint: process.env.WORDPRESS_API_URL,
	username: process.env.WORDPRESS_USER,
	password: process.env.WORDPRESS_PASSWORD,
});

export default wordpress;
