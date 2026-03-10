const fs = require("fs");
const path = require("path");

exports.home = (req, res) => {

  const file = path.join(
    process.cwd(),
    "public/data",
    "syllabus.json"
  );

  let courses = [];

  try {

    const syllabus = JSON.parse(fs.readFileSync(file,"utf8"));
    courses = syllabus.courses || [];

  } catch(err){

    console.error("failed to load syllabus");

  }

  res.render("home", { courses });

};