const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Creates a variable that holds an absolute path for team.html that will be created in writeFile
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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
                type: "input",
                name: "managerId",
                message: "What is your manager's id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?"
            },
        ])
            .then(val => {
                // Creating new Manager object with the value's from the prompt filling in it's parameters
                const managerObj = new Manager(val.managerName, val.managerId, val.managerEmail, val.managerOfficeNumber);

                // console.log(managerObj);

                // Pushing created manager object into teamMembers array
                teamMembers.push(managerObj);

                // console.log(teamMembers);

                // Once manger information is input the prompt will continue on to the createTeam function
                this.createTeam();
            });
    }




    // Method that prompts user to select employee type. This method leads prompt to continue on to .engineerInfo(), ,intertInfo(), or the done()
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
                        this.done()
                        break;
                    default:
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
                name: "github",
                message: "What is your engineer's GitHub username?",
            },
        ])
            .then(val => {
                // Creating new Engineer object
                const engineerObj = new Engineer(val.nameEngineer, val.idEngineer, val.emailEngineer, val.github);

                // Pushing to array

                teamMembers.push(engineerObj);

                // starting createTeam() again

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
                name: "school",
                message: "What is your intern's school?",
            },
        ])
            .then(val => {
                const internObj = new Intern(val.nameIntern, val.idIntern, val.emailIntern, val.school);

                teamMembers.push(internObj);

                this.createTeam();
            });
    }

    // Closes inquirer prompt
    done() {
        // Renders html files to house teamMembers array's values
        const actualizeTeam = render(teamMembers);

        // Writes a new html with all rendered html files stitched together
        fs.writeFileSync(outputPath, actualizeTeam, "utf8");

        console.log("Generating HTML...");

        // exits
        process.exit(0);
    }



}

// Creating new Team object that contains all object's function
const team = new Team();

// Starts object's methods
team.createManager();



