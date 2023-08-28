const router = require("express").Router();
const memberCtrl = require("../../controller/member/member_ctrl");

router.post("/register", memberCtrl.register);
router.get("/register_form", memberCtrl.registerForm);
router.get("/login", memberCtrl.login);
router.post("/login_check", memberCtrl.loginCheck);
router.get("/list", memberCtrl.list);
router.get("/info", memberCtrl.info);

module.exports = router;
