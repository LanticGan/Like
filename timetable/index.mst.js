const dm = require("./app/lib/data-manager");

module.exports = async function(ctx) {
	let query = await dm.getTimetableOptions();

	let grades = [];
	for (let item of query) {
		let grade;
		if (!(grade = grades.find(v => v.value === item.grade)))
			grades.push(grade = {
				value: item.grade,
				majors: []
			});
		
		let major;
		if (!(major = grade.majors.find(v => v.value === item.major)))
			grade.majors.push(major = {
				value: item.major,
				classNames: []
			});

		major.classNames.push(item.class_name);
	}

	console.log(JSON.stringify(grades, null, 2));
	return { grades };
};