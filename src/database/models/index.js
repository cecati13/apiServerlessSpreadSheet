import { BienesServicios, BienesServiciosSchema } from "./bienesServicios.model.js";
import { Cursos, CursosSchema} from "./cursos.model.js";
import { Domicilios, DomiciliosSchema } from "./domicilios.model.js";
import { Empleos, EmpleosSchema } from "./empleos.model.js";
import { Especialidades, EspecialidadesSchema } from "./especialidades.model.js";
import { Estudiantes, EstudiantesSchema } from "./estudiantes.model.js";
import { Inscripciones, InscripcionesSchema } from "./inscripciones.model.js";
import { Matriculas, MatriculasSchema } from "./matriculas.model.js";
import { MediosInformacion, MediosInformacionSchema } from "./mediosInformacion.model.js";
import { MotivosEleccion, MotivosEleccionSchema } from "./motivosEleccion.model.js";
import { NombresCursos, NombresCursosSchema } from "./nombresCursos.model.js";
import { Periodos, PeriodosSchema } from "./periodos.model.js";
import { Profesores, ProfesorsSchema } from "./profesores.model.js";
import { ServiciosMedicos, ServiciosMedicosSchema } from "./serviciosMedicos.model.js";
import { Socioeconomicos, SocioeconomicosSchema } from "./socioeconomicos.model.js";
import { StatusInscripciones, StatusInscripcionesSchema } from "./statusInscripciones.model.js";
import { StatusPagos, StatusPagosSchema } from "./statusPagos.model.js";
import { Users, UsersSchema } from "./users.model.js";

export function setupModels (sequelize) {
    BienesServicios.init(BienesServiciosSchema, BienesServicios.config(sequelize));
    Cursos.init(CursosSchema, Cursos.config(sequelize));
    Domicilios.init(DomiciliosSchema, Domicilios.config(sequelize));
    Empleos.init(EmpleosSchema, Empleos.config(sequelize));
    Especialidades.init(EspecialidadesSchema, Especialidades.config(sequelize));
    Estudiantes.init(EstudiantesSchema, Estudiantes.config(sequelize));
    Inscripciones.init(InscripcionesSchema, Inscripciones.config(sequelize));
    Matriculas.init(MatriculasSchema, Matriculas.config(sequelize));
    MediosInformacion.init(MediosInformacionSchema, MediosInformacion.config(sequelize));
    MotivosEleccion.init(MotivosEleccionSchema, MotivosEleccion.config(sequelize));
    NombresCursos.init(NombresCursosSchema, NombresCursos.config(sequelize));
    Periodos.init(PeriodosSchema, Periodos.config(sequelize));
    Profesores.init(ProfesorsSchema, Profesores.config(sequelize));
    ServiciosMedicos.init(ServiciosMedicosSchema, ServiciosMedicos.config(sequelize));
    Socioeconomicos.init(SocioeconomicosSchema, Socioeconomicos.config(sequelize));
    StatusInscripciones.init(StatusInscripcionesSchema, StatusInscripciones.config(sequelize));
    StatusPagos.init(StatusPagosSchema, StatusPagos.config(sequelize));
    Users.init(UsersSchema, Users.config(sequelize));

    BienesServicios.associate(sequelize.models);
    Cursos.associate(sequelize.models);
    Domicilios.associate(sequelize.models);
    Empleos.associate(sequelize.models);
    Especialidades.associate(sequelize.models);
    Estudiantes.associate(sequelize.models);
    Inscripciones.associate(sequelize.models);
    Matriculas.associate(sequelize.models);
    MediosInformacion.associate(sequelize.models);
    MotivosEleccion.associate(sequelize.models);
    NombresCursos.associate(sequelize.models);
    Periodos.associate(sequelize.models);
    Profesores.associate(sequelize.models);
    ServiciosMedicos.associate(sequelize.models);
    Socioeconomicos.associate(sequelize.models);
    StatusInscripciones.associate(sequelize.models);
    StatusPagos.associate(sequelize.models);
    Users.associate(sequelize.models);
}