const path = require("path");
const dm = require("./app/lib/data-manager");
const { avatarsRoute } = require("./app/lib/util");

module.exports = async function(ctx) {
	let user = await dm.getUserById(ctx.virtualParams[0]);
	let counts = await dm.getPhoInfo(ctx.virtualParams[0], ctx.session.userid);
	user.avatar = path.join(avatarsRoute, user.avatar + ".jpg");
	for (const key in counts) {
		user[key] = counts[key];
	}
	return user;
};