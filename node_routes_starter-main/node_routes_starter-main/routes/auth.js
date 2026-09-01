const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const protectedRoute = (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: "No token provided" });
	}
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		res.json({ message: "Protected content", user: decoded });
	} catch (error) {
		console.error("Error verifying token:", error);
		res.status(401).json({ message: "Invalid token" });
	}
};

router.get("/home", authController.home);
router.get("/protected", authController.protectedRoute);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
