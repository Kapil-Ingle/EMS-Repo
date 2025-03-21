import express from "express";
import sidenavMenu from "../controllers/sidenavController.js";

const router = express.Router();

router.get('/sidemenu',sidenavMenu);

export default router;