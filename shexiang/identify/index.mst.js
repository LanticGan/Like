const path = require("path");
const dm = require("./app/lib/data-manager");
const { certifRoute } = require("./app/lib/util");

module.exports = async function(ctx) {
	let certif = await dm.getPhoCertif(ctx.session.userid);
	if (!certif) return { userid: false };

	certif.materials = certif.materials.map(name => path.join(certifRoute, name + ".jpg"));
	certif.status_pending = certif.status === "pending";
	certif.status_resolved = certif.status === "resolved";
	certif.status_rejected = certif.status === "rejected";
	
	delete certif.status;
	return certif;
};