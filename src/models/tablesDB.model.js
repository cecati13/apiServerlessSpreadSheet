export const roles = {
    sAdmin: "sAdmin",
    admin: "admin",
    user: "user",
    notFunctions: "notFunctions"
}

const users = {
    name: "users",
    fields: {
        emial: "",
        name: "",
        role: roles.notFunctions,
    }
}

export const tablesDB = {
    users: users.name,
    students: "estudiantes",
}