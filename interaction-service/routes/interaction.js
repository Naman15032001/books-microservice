var express = require("express");
var router = express.Router();
const InteractionController = require("../core/controllers/interaction.controller");

const API_GROUP = "/api/v1";

router.post(API_GROUP + "/interaction", (...args) =>
    new InteractionController().add_interaction(...args)
);

router.get(API_GROUP + "/interaction/top", (...args) =>
    new InteractionController().get_top_interactions(...args)
);

router.get(API_GROUP + "/interaction/:id", (...args) =>
    new InteractionController().get_interaction_by_id(...args)
);

module.exports = router;
