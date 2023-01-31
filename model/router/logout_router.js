const {Router} = require("express");
const {serialize} = require("cookie");
const jwt = require("jsonwebtoken");
const {auntenticando} = require("./util");
const secret = require("./util").secret;
const router = Router();
router.get("/seccion_close",auntenticando, (req, res) => {
	if (!req.cookies) {
		return res.render("login");
	}
	try {
		jwt.verify(req.cookies.DataLogin, secret);
		const serialized = serialize("DataLogin", null, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 0,
			path: "/",
		});
		res.setHeader("Set-Cookie", serialized);
		res.redirect("index");
	} catch (error) {
		throw error;
	}
});
module.exports = router;
