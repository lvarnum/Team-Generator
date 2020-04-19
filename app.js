// Dependencies ---------------------------------------
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//-----------------------------------------------------

// Arrays to hold inquirer prompts and employee objects
var questions = [
    {
        message: "Employee name: ",
        name: "name"
    },
    {
        message: "Employee Role: ",
        name: "role"
    },
    {
        message: "Employee Email: ",
        name: "email"
    },
    {
        message: "Employee ID: ",
        name: "id"
    }
];

var employees = [];
//------------------------------------------------------

// Ask user if they would like to continue entering employees and call 
// the getInput() function if they do. Otherwise render the team page.
function start() {
    inquirer.prompt({
        message: "Would you like to enter an employee? (y/n) ",
        name: "add"
    }).then(answers => {
        var add = answers.add.trim().toLowerCase();
        if (add === "y") {
            getInput();
        }
        else {
            console.log("Stopping inputs.");
            const html = render(employees);
            createOutput(html);
        }
    });
}
//----------------------------------------------------------------------

// Use inquirer to gather information about the development team members,
// create objects for each team member based on their role.
function getInput() {
    inquirer.prompt(questions)
        .then(answers => {
            var role = answers.role.trim().toLowerCase();
            var name = answers.name.trim();
            var id = answers.id.trim();
            var email = answers.email.trim();
            var finalQuestion;
            if (role === "intern") {
                finalQuestion = "Intern's school: ";
            }
            if (role === "engineer") {
                finalQuestion = "Engineer's GitHub username: ";
            }
            if (role === "manager") {
                finalQuestion = "Manager's office number: ";
            }

            inquirer.prompt({
                message: finalQuestion,
                name: "info"
            }).then(answers => {
                var info = answers.info.trim();
                if (role === "intern") {
                    employees.push(new Intern(name, id, email, info));
                }
                if (role === "engineer") {
                    employees.push(new Engineer(name, id, email, info));
                }
                if (role === "manager") {
                    employees.push(new Manager(name, id, email, info));
                }
                start();
            });
        });
}
//----------------------------------------------------------------------------

// Write the team.html file to the output folder with the html
// from the render function.
function createOutput(html) {
    fs.writeFile(outputPath, html, (err) => {
        if (err) throw err;
        console.log("Team Page Rendered!");
    })
}
//------------------------------------------------------------

// Call the starting function
start();