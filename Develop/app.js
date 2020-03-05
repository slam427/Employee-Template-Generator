const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const devTeam = [];

const newEmployeeQuestions = [
    {
    name: "role",
    message: "Which role would you like to add to your team?",
    type: "list",
    choices: [
        "Manager",
        "Intern",
        "Engineer",
        "Team is complete.",
    ]
    },

    {
    name: "name",
    message: "Please provide a name.",
    type: "input"
    },

    {
    name: "id",
    message: "Please provide an associated employee ID.",
    type: "input"
    },

    {
    name: "email",
    message: "Please provide an associated email.",
    type: "input"
    },
];

const managerQuestions = [
    {
    name: "officeNumber",
    message: "What is your office number?",
    type: "input"
    }
];

const internQuestions = [
    {
    name: "school",
    message: "What school did the intern attend?",
    type: "input"
    }
];

const engineerQuestions = [
    {
    name: "gitHub",
    message: "What is the engineer's Github username?",
    type: "input"
    }
];
// console.log(newEmployeeQuestions.name);


// function mainQuestion(info){inquirer.prompt(newEmployeeQuestions).then(function(){

// })
// }
employeeData();

function employeeData() {
inquirer.prompt(newEmployeeQuestions).then(function(info){
if(info.role != "Team is complete.") {

    if(info.role === "Manager") {
        inquirer.prompt(managerQuestions).then(function(officeNumber) {
            const newManager = new Manager (info.name, info.id, info.email, officeNumber);
            devTeam.push(newManager);
            // console.log(newManager);
        });
    }

    if(info.role === "Intern") {
        inquirer.prompt(internQuestions).then(function(school) {
            const newIntern = new Intern (info.name, info.id, info.email, school);
            devTeam.push(newIntern);
            console.log(newIntern);
        });
    }

    if(info.role === "Engineer") {
        inquirer.prompt(engineerQuestions).then(function(github) {
            const newEngineer = new Engineer (info.name, info.id, info.email, github);
            devTeam.push(newEngineer);
            console.log(newEngineer);
        });
    }
}
else {
    return "Team is complete!"
}
})
}