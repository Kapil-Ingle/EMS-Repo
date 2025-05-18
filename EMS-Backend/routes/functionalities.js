import express from "express";
import sidenavMenu from "../controllers/sidenavController.js";
import { createDropdown } from "../controllers/commonController.js";

const router = express.Router();

/**
 * @swagger
 * /api/data/create-dropdown:
 *   post:
 *     summary: Save Dropdown List
 *     tags:
 *       - Dropdown
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dropdownName:
 *                 type: string
 *               dropdownValues:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dropdown created successfully
 *       400:
 *         description: Bad request or missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/data/sidemenu:
 *   post:
 *     summary: Fetch Sidemenus
 *     tags:
 *       - Sidemenu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sidemenu fetched successfully
 *       400:
 *         description: Bad request or missing required fields
 *       500:
 *         description: Server error
 */


router.post('/sidemenu',sidenavMenu);
router.post('/create-dropdown', createDropdown)

export default router;