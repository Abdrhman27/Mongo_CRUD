const express = require("express");
const router = express.Router();
const controller = require("../../controllers/employeesController")
const ROLES_LIST = require("../../config/roles_list");
const verfiyRoles = require("../../middleware/verfiyRoles");

router.route('/').get(controller.getAllEmployees).post(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
controller.createNewEmployee).put(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),controller.updateEmployee)
.delete(verfiyRoles(ROLES_LIST.Admin),controller.deleteEmployee);

router.route("/:id").get(controller.getEmployee)

module.exports = router;