const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// Need to figure out what these are

const render = require("./lib/htmlRenderer");

// Creating arrays to push gathered information to
const teamMembers = [];
const idArray = [];

class Team {
    // Defining part of prompt that gathers manager's information and starts prompt
createManager() {
    console.log("Please build your team");
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
        },
        {
            type: "number",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        },
    ])
    .then(() => {
        this.createTeam();
    });
    // Once manger information is input the prompt will continue on to the createTeam function
}

// Defining part of prompt that gathers team member's information
createTeam() {
    return inquirer.prompt([
        {
            type: "list",
            name: "memberType",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ])
        .then(answer => {
            console.log(answer.memberType);
            switch (answer.memberType) {
                case "Engineer":
                    this.engineerInfo();
                    break;
                case "Intern":
                    this.internInfo();
                    break;
                case "I don't want to add anymore team members":
                    this.done();
            }
        });
}

// If Engineer is slected we run these prompts and then loop back to the createTeam function
engineerInfo() {
    return inquirer.prompt([
        {
            type: "input",
            name: "nameEngineer",
            message: "What is your engineer's name?",
        },
        {
            type: "input",
            name: "idEngineer",
            message: "What is your engineer's id?",
        },
        {
            type: "input",
            name: "emailEngineer",
            message: "What is your engineer's email?",
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's GitHub username?",
        },
    ])
        .then(() => {
            this.createTeam();
        });
}

// If Intern is slected we run these prompts and then loop back to the createTeam function
internInfo() {
    return inquirer.prompt([
        {
            type: "input",
            name: "nameIntern",
            message: "What is your intern's name?",
        },
        {
            type: "input",
            name: "idIntern",
            message: "What is your intern's id?",
        },
        {
            type: "input",
            name: "emailIntern",
            message: "What is your intern's email?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?",
        },
    ])
        .then(() => {
            this.createTeam();
        });
}

// Closes inquirer prompt
// Need to add gnerateHtml function
done() {
    console.log("Generating HTML...");
    process.exit(0);
}


}

// Can just call all functions in an init()

const team = new Team();

team.createManager();






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team mem

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
