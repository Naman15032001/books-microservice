var express = require("express");
var router = express.Router();
const ContentController = require("../core/controllers/content.controller");
const multer = require('multer')
const upload = multer({
    dest: 'tmp/csv/'
});

const API_GROUP = "/api/v1";

router.post(API_GROUP + "/content", (...args) =>
    new ContentController().create_content(...args)
);

router.post(API_GROUP + "/content/ingest", upload.single('file'), (...args) =>
    new ContentController().ingest_records(...args)
);

router.get(API_GROUP + "/content/new", (...args) =>
    new ContentController().get_new_content(...args)
);

router.get(API_GROUP + "/content/top", (...args) =>
    new ContentController().get_top_content(...args)
);

router.delete(API_GROUP + "/content/:id", (...args) =>
    new ContentController().delete_content_by_id(...args)
);
router.get(API_GROUP + "/content/:id", (...args) =>
    new ContentController().get_content_by_id(...args)
);

router.put(API_GROUP + "/content/:id", (...args) =>
    new ContentController().update_content_by_id(...args)
);

module.exports = router;
