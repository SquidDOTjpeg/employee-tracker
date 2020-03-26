var inquirer = require("inquirer")
var mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "companyDB"
})

connection.connect((err) => {
    if (err) throw err
    console.log("Connected as id " + connection.threadId)
    startPrompt()
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
                connection.end()
                return
            }
        })
}


function viewOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose Option",
                choices: ["View company departments, roles, employees", "Create departments, roles, employees", "Update employee roles"],
                name: "choice"
            }
        ]).then((data) => {
            switch (data.choice) {
                case "View company departments, roles, employees":
                    view()
                    break
                case "Create departments, roles, employees":
                    create()
                    break
                case "Update employee roles":
                    update()
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
                choices: ["View company departments", "View company employee roles", "View company employees"],
                name: "choice"
            }
        ]).then((data) => {
            switch (data.choice) {
                case "View company departments":
                    viewDepartments()
                    break
                case "View company employee roles":
                    viewRoles()
                    break
                case "View company employees":
                    viewEmployees()
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
                choices: ["Create company departments", "Create company employee roles", "Create company employees"],
                name: "choice"
            }
        ]).then((data) => {
            switch (data.choice) {
                case "Create company departments":
                    createDepartments()
                    break
                case "Create company employee roles":
                    createRoles()
                    break
                case "Create company employees":
                    createEmployees()
                    break
            }
        })
}

function createDepartments() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the name of the department you want to create. 30 character max",
                name: "name"
            }
        ]).then((data) => {
            connection.query("INSERT INTO departments SET ?", { name: data.name }, function (err, res) {
                if (err) throw err
                console.log(res.affectedRows + " department created. \n")
                viewOptions()
            })
        })
}

function createRoles() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the title of the new role. 30 character max",
                name: "title"
            },
            {
                type: "input",
                message: "Enter the salary of the new role.",
                name: "salary"
            },
            {
                type: "input",
                message: "Enter the department id of the new role.",
                name: "department"
            }
        ]).then((data) => {
            connection.query("INSERT INTO roles SET ?",
                {
                    title: data.title,
                    salary: data.salary,
                    department_id: data.department
                }, (err, res) => {
                    if (err) throw err
                    console.log(res.affectedRows + " role created. \n")
                    viewOptions()
                })
        })
}

function createEmployees() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the first name of the new employee. 30 character max",
                name: "firstName"
            },
            {
                type: "input",
                message: "Enter the last name of the new employee. 30 character max",
                name: "lastName"
            },
            {
                type: "input",
                message: "Enter the role id of the new employee.",
                name: "roleId"
            },
            {
                type: "input",
                message: "Enter the manager id of the new employee.",
                name: "manager"
            }
        ]).then((data) => {
            connection.query("INSERT INTO employees SET ?",
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    role_id: data.roleId,
                    manager_id: data.manager
                },
                (err, res) => {
                    if (err) throw err
                    console.log(res.affectedRows + " employee profile created")
                    viewOptions()
                })
        })
}

function update() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the id of the employee you want to update the role of.",
                name: "id"
            },
            {
                type: "input",
                message: "What is the new role id?",
                name: "newRole"
            }
        ]).then((data) => {
            connection.query("UPDATE employees SET ? WHERE ?",
                [
                    {
                        role_id: data.newRole
                    },
                    {
                        id: data.id
                    }
                ],
                (err, res) => {
                    if (err) throw err
                    console.log(`Updated employee with id of ${data.id}'s role to role id ${data.newRole}`)
                    viewOptions()
                })
        })
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) throw (err)
        console.log(res)
        viewOptions()
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw (err)
        console.log(res)
        viewOptions()
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) throw (err)
        console.log(res)
        viewOptions()
    })
}
