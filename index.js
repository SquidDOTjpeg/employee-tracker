var inquirer = require("inquirer")
var mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "companyDB"
})

function startPrompt() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Run employee tracker?",
                choices: ["Run", "Cancel"],
                name: "confirm"
            }
        ]).then((data) => {
            if (data.confirm === "Run") {
                console.log("yee")
                viewOptions()
            } else {
                console.log("Nee")
                return
            }
        })
}

startPrompt()

function viewOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose Option",
                choices: ["View company departments, roles, employees", "Create departments, roles, employees", "Update Employee Roles"],
                name: "choice"
            }
        ]).then((data) => {
            switch (data.choice) {
                case "View company departments, roles, employees": view()
                    break

                case "Create departments, roles, employees": create()
                    break

                case "Update Employee Roles": update()
                    break
            }
        })
}

function view() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose Option",
                choices: ["View company departments", "View company employee roles", "View Company Employees"],
                name: "choice"
            }
        ]).then((data) => {
            switch (data.choice) {
                case "View company departments": viewDepartments()
                break
                case "View company employee roles": viewRoles()
                break
                case "View Company Employees": viewEmployees()
                break
            }
        })
}

function create() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose Option",
                choices: ["Create company departments", "Create company employee roles", "Create Company Employees"],
                name: "choice"
            }
        ]).then((data) => {
            switch (data.choice) {
                case "Create company departments": createDepartments()
                break
                case "Create company employee roles": createRoles()
                break
                case "Create Company Employees": createEmployees()
                break
            }
        })
}
