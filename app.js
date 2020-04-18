const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
                    employess.push(new Manager(name, id, email, info));
                }
                start();
            });
        });
}

function createOutput(html) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, html, (err) => {
        if (err) throw err;
        console.log("Team Page Rendered!");
    })
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

start();