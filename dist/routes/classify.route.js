"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classify_controller_1 = require("../controllers/classify.controller");
const router = (0, express_1.Router)();
router.get("/classify", classify_controller_1.classifyName);
exports.default = router;
