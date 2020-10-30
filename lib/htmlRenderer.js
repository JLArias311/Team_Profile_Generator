// This file is going to be used by app.js
const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");
// So from my understanding this file is already set-up and I am going to have to base me code on this
// That said const templatesDir is creating an absolute path to the templates folder
// Why? I don't quite know yet


const render = employees => {
  // This is defining named function render
  const html = [];
  // Here a variable holding an empty array is made

  html.push(...employees
    // Here we are able to hold an unlimited number of parameter values that are pushed to our html array
    .filter(employee => employee.getRole() === "Manager")
    // These parameters are being filtered to employee's with role of manager
    .map(manager => renderManager(manager))
    // Map returns a brand new array the same length as the first. Each element is passed into the callback.
    // Whatever is returned from the callback at each iteration is what goes into that index of the new array
    // So, basically here we are only filtering through the inserted objects and copying them with function renderManager and pushing to html array
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  // We are doing the same here for Enginerr's
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));
  // Here we are calling the renderMain function with the html array joined with no spaces
};

const renderManager = manager => {
  // This is where the templateDir from above is coming into play. It it grabbing the templates folder and grabbing the manager.html file to read.
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  // In manager.html file placeholder name string is being replaced by managerName input
  template = replacePlaceholders(template, "name", manager.getName());
  // Same here with role
  template = replacePlaceholders(template, "role", manager.getRole());
  // Same
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
  // Here we are retunring the edited template
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
  // Same as we did with manager.html
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
  // Same as we did with manager.html
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  // Here we are going into the main.html file
  return replacePlaceholders(template, "team", html);
  // We are replacing {{team}} with our html array
};

// Defining a function that grabs the template route, the placeholder, and the value
const replacePlaceholders = (template, placeholder, value) => {
  // Regular expressions are used to perform pattern-matching and "search-and-replace" functions on text.
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");

  return template.replace(pattern, value);
  // Replacing all forms of this pattern {{placeholders}} in the template with value which is not yet defined
  // Basically replacing placeholder with new value
};

module.exports = render;
