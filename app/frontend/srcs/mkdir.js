import {mkdir} from "fs"

for (let i = 1; i < 51; ++i) {
	mkdir(`./public/${i}`, (err) => {
		if (err)
			console.error(err);
	});
}