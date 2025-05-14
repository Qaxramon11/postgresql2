const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: Seat management
 */

/**
 * @swagger
 * /api/seats:
 *   post:
 *     tags: [Seats]
 *     summary: Create a new seat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       201:
 *         description: Seat created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/seats', seatController.createSeat);

/**
 * @swagger
 * /api/seats:
 *   get:
 *     tags: [Seats]
 *     summary: List all seats
 *     responses:
 *       200:
 *         description: List of seats
 *       500:
 *         description: Server error
 */
router.get('/seats', seatController.getSeat);

/**
 * @swagger
 * /api/seats/search:
 *   get:
 *     tags: [Seats]
 *     summary: Search seats by number or section
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query for seat number or section
 *     responses:
 *       200:
 *         description: List of seats matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/seats/search', seatController.searchSeat);

/**
 * @swagger
 * /api/seats/{id}:
 *   get:
 *     tags: [Seats]
 *     summary: Get seat by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Seat ID
 *     responses:
 *       200:
 *         description: Seat details
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.get('/seats/:id', seatController.getSeatById);

/**
 * @swagger
 * /api/seats/{id}:
 *   put:
 *     tags: [Seats]
 *     summary: Update seat by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Seat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seat updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.put('/seats/:id', seatController.updateSeat);

/**
 * @swagger
 * /api/seats/{id}:
 *   delete:
 *     tags: [Seats]
 *     summary: Delete seat by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Seat ID
 *     responses:
 *       200:
 *         description: Seat deleted
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.delete('/seats/:id', seatController.deleteSeat);

module.exports = router;
