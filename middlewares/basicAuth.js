const basicAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Basic ")) {
		res.setHeader("WWW-Authenticate", "Basic");
		return res.status(401).json({ message: "Authentication required." });
	}

	const base64Credentials = authHeader.split(" ")[1];
	const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
	const [user, pass] = credentials.split(":");

	const USERNAME = process.env.BASIC_AUTH_USERNAME;
	const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

	if (user === USERNAME && pass === PASSWORD) {
		return next();
	}

	res.setHeader("WWW-Authenticate", "Basic");
	return res.status(401).json({ message: "Invalid credentials." });
};

module.exports = basicAuth;