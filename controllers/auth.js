const User = require("../models/User");

//hash passwords with bcrypt lib
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
	const { username, password } = req.body;
	if (password.length < 6) {
		return res.status(400).json({ message: "Password less than 6 characters" });
	}
	try {
		bcrypt.hash(password, 10).then(async (hash) => {
			await User.create({
				username,
				password: hash,
			}).then((user) => {
				const maxAge = 3 * 60 * 60; // 3 hours
				// payload for users (no sensitive info)
				const token = jwt.sign(
					{ id: user._id, username, role: user.role },
					jwtSecret,
					{ expiresIn: maxAge }
				);
				// send token as a cookie to client
				res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // 3 hours in ms
				res.status(200).json({
					message: "User successfully created",
					user,
				});
			});
		});
	} catch (err) {
		res.status(401).json({
			message: "User not successful created",
			error: err.message,
		});
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	// check if username and password are provided
	if (!username) return res.status(400).json({ message: "Missing username" });
	if (!password) return res.status(400).json({ message: "Missing password" });

	try {
		const user = await User.findOne({ username });
		if (!user) {
			res
				.status(401)
				.json({ message: "Login not successful", error: "User not found" });
		} else {
			// compare password with hashed password
			bcrypt.compare(password, user.password).then(function (result) {
				if (result) {
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						{ id: user._id, username, role: user.role },
						jwtSecret,
						{
							expiresIn: maxAge, // 3 hours
						}
					);
					res.cookie("jwt", token, {
						httpOnly: true,
						maxAge: maxAge * 1000, // 3 hours in ms
					});

					res.status(201).json({ message: "Login successful", user });
				} else {
					res.status(400).json({ message: "Login not successful" });
				}
			});
		}
	} catch (e) {
		res
			.status(500)
			.json({ message: "Internal Server Error", error: e.message });
	}
};

exports.update = async (req, res) => {
	const { role, id } = req.body;
	// Check for role and id
	if (role && id) {
		// Verifying if the value of role is admin
		if (role === "admin") {
			// find admin user
			await User.findById(id)
				.then((user) => {
					if (user.role !== "admin") {
						user.role = role;
						user.save((err) => {
							// mongodb error checker
							if (err) {
								res
									.status("400")
									.json({ message: "An error occurred", error: err.message });
								process.exit(1);
							}
							res.status("201").json({ message: "Update Successful ", user });
						});
					} else {
						res.status(400).json({ message: "User is already an admin" });
					}
				})
				.catch((err) => {
					res
						.status(400)
						.json({ message: "An error occurred", error: err.message });
				});
		} else {
			res.status(400).json({
				message: "Role is not admin",
			});
		}
	} else {
		res.status(400).json({ message: "Role or Id not present" });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.body;
	// remove specific user from database
	await User.findById(id)
		.then((user) => user.remove())
		.then((user) =>
			res.status(201).json({ message: "User successfully deleted", user })
		)
		.catch((err) =>
			res.status(400).json({ message: "An error occurred", error: err.message })
		);
};
