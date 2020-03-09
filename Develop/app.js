const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employees = [];

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
        name: "github",
        message: "What is the engineer's Github username?",
        type: "input"
    }
];

const anotherMember = [
    {
        name: "teamMember",
        message: "Would you like to add another member to your team?",
        type: "confirm"
    }
]

function addingAnother() {
    return inquirer.prompt(anotherMember);
}

function addEmployee() {
    inquirer.prompt(newEmployeeQuestions).then(function (info) {
        if (info.role != "Team is complete.") {
            if (info.role === "Manager") {
                inquirer.prompt(managerQuestions).then(function (officeNumber) {
                    const newManager = new Manager(info.name, info.id, info.email, officeNumber.officeNumber);
                    console.log("Manager added to team.")
                    employees.push(newManager);
                    addingAnother().then(function (addAnother) {
                        if (addAnother.teamMember === false) {
                            let createTeam = render(employees);
                            fs.writeFileSync(outputPath, createTeam, function (err) {
                                if (err) throw err;
                            });
                        }
                        if (addAnother.teamMember === true) {
                            addEmployee();
                        }
                    })
                });
            }

            if (info.role === "Intern") {
                inquirer.prompt(internQuestions).then(function (school) {
                    console.log("Intern added to team.")
                    const newIntern = new Intern(info.name, info.id, info.email, school.school);
                    employees.push(newIntern);
                    addingAnother().then(function (addAnother) {
                        if (addAnother.teamMember === false) {
                            let createTeam = render(employees);
                            fs.writeFileSync(outputPath, createTeam, function (err) {
                                if (err) throw err;
                            });
                        }
                        if (addAnother.teamMember === true) {
                            addEmployee();
                        }
                    })
                });
            }

            if (info.role === "Engineer") {
                inquirer.prompt(engineerQuestions).then(function (github) {
                    console.log("Engineer added to team.")
                    const newEngineer = new Engineer(info.name, info.id, info.email, github.github);
                    employees.push(newEngineer);
                    addingAnother().then(function (addAnother) {
                        if (addAnother.teamMember === false) {
                            let createTeam = render(employees);
                            fs.writeFileSync(outputPath, createTeam, function (err) {
                                if (err) throw err;
                            });
                        }
                        if (addAnother.teamMember === true) {
                            addEmployee();
                        }
                    })
                });
            }
        }

    });
}
addEmployee();
