const express = require('express');
const router = express.Router();
const { processMockPayment, calculateRentalAmount } = require('../controllers/paymentController');

// Mock payment processing endpoint
router.post('/process', processMockPayment);

// Calculate rental amount endpoint
router.post('/calculate', (req, res) => {
    try {
        const { pickup_date, return_date, price_per_day } = req.body;

        if (!pickup_date || !return_date || !price_per_day) {
            return res.status(400).json({ 
                error: "Minden mező kitöltése kötelező (pickup_date, return_date, price_per_day)" 
            });
        }

        const result = calculateRentalAmount(pickup_date, return_date, price_per_day);
        
        res.status(200).json({
            success: true,
            rentalInfo: result
        });

    } catch (err) {
        console.error("Error calculating rental amount:", err);
        res.status(500).json({ 
            error: "Hiba az ár számításánál", 
            details: err.message 
        });
    }
});

module.exports = router;