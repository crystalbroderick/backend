const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Protect routes from unauthorized users
// Take token from cookie, verify token and redirect users depending on role

// Authenticate admin users to admin route
exports.adminAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				return res.status(401).json({ message: "Not authorized" });
			} else {
				if (decodedToken.role !== "admin") {
					return res.status(401).json({ message: "Not authorized" });
				} else {
					// token + admin, admin access approved
					next();
				}
			}
		});
	} else {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
};

// Authenticate basic users to users route
exports.userAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				return res.status(401).json({ message: "Not authorized" });
			} else {
				if (decodedToken.role !== "basic") {
					return res.status(401).json({ message: "Not authorized" });
				} else {
					next();
				}
			}
		});
	} else {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
};
