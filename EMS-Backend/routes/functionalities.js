import express from "express";
import sidenavMenu from "../controllers/sidenavController.js";
import { createDropdown, getDropdown, getAllDropdowns } from "../controllers/commonController.js";

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
 *                 type: array
 *                 items:
 *                   type: string
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

/**
 * @swagger
 * /api/data/get-dropdown:
 *   post:
 *     summary: Fetch Single Dropdown
 *     tags:
 *       - Get Dropdown
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dropdownName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dropdown fetched successfully
 *       400:
 *         description: Bad request or missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/data/get-all-dropdowns:
 *   get:
 *     summary: Fetch All Dropdowns
 *     tags:
 *       - Get Dropdowns
 *     responses:
 *       200:
 *         description: List of all dropdowns fetched successfully
 *       500:
 *         description: Server error
 */


router.post('/sidemenu',sidenavMenu);
router.post('/create-dropdown', createDropdown)
router.post('/get-dropdown', getDropdown)
router.get('/get-all-dropdowns', getAllDropdowns)

export default router;