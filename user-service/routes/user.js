var express = require("express");
var router = express.Router();
const UserController = require("../core/controllers/user.controller");

const API_GROUP = "/api/v1";

router.post(API_GROUP + "/user", (...args) =>
    new UserController().create_user(...args)
);
router.delete(API_GROUP + "/user/:id", (...args) =>
    new UserController().delete_user_by_id(...args)
);
router.get(API_GROUP + "/user/:id", (...args) =>
    new UserController().get_user_by_id(...args)
);

router.put(API_GROUP + "/user/:id", (...args) =>
    new UserController().update_user_by_id(...args)
);

module.exports = router;
