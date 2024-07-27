import { Router } from "express";
import passport from "passport";

import {
    uploadFI,
    msalTokenVerify,
    decodeOauthToken,
    userAllowedHandler,
    checkRoleAdmin,
    checkRole,
    notTheSameUser
} from "./../middlewares/index.js";

import { changeTokenUser, deleteUser, getUsers, updateRoleUser } from "../controller/userController.js";
import { getFile, getListBlobs, deleteFile, getRegistrationRecord, postFileInformation } from "../controller/controlStudentsController.js";

const router = Router();

router.get("/oauth",
    [decodeOauthToken, msalTokenVerify, userAllowedHandler],
    changeTokenUser
);

//users
router.get("/users",
    passport.authenticate("jwt", { session: false }),
    checkRoleAdmin,
    getUsers
);

router.put("/updateRole/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleAdmin,
    notTheSameUser,
    updateRoleUser
);

router.delete("/user/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoleAdmin,
    notTheSameUser,
    deleteUser
);
//users

//control Escolar
router.get("/listBlobs/:container",
    passport.authenticate("jwt", { session: false }),
    checkRole,
    getListBlobs
);

router.get("/registrationRecord", 
    passport.authenticate("jwt", { session: false }),
    checkRole,
    getRegistrationRecord
);

router.get("/file/:filename",
    passport.authenticate("jwt", { session: false }),
    checkRole,
    getFile
);

router.delete("/file/:filename",
    passport.authenticate("jwt", { session: false }),
    checkRole,
    deleteFile
)

router.post("/fileInformation",
    passport.authenticate("jwt", { session: false }), uploadFI,
    checkRole,
    postFileInformation
);
//control Escolar

export default router;