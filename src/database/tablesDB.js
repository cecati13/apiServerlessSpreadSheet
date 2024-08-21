export const roles = {
    sAdmin: "sAdmin",
    admin: "admin",
    user: "user",
    notFunctions: "notFunctions"
}

const users = {
    name: "users",
    fields: {
        email: "",
        name: "",
        role: roles.notFunctions,
    }
}

export const tablesDB = {
    users: users.name,
    students: "estudiantes",
    courses: "cursos",
    inscriptions: "inscripciones",
    profesors: "profesores",
    specialties: "especialidades",
    address: "domicilios",
    numberControls: "matriculas",
    jobs: "empleos",
    socioeconomic: "socioeconomicos",
    informationMedium: "medios_informacion",
    reasonCourseChoises: "motivos_eleccion",
    belongings: "bienes_servicios",
    medicalServices: "servicios_medicos",
    periods: "periodos",
    coursesNames: "nombres_cursos",
    inscriptionStatus: "status_inscripciones",
    paymentStatus: "status_pagos",
}