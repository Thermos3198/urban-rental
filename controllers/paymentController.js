const db = require('../db/db');

async function getCarPriceById(vehicle_id) {
    try {
        const sql = 'SELECT price_per_day FROM vehicles WHERE vehicle_id = ?';
        const [result] = await db.query(sql, [vehicle_id]);
        return result[0]?.price_per_day || 0;
    } catch (err) {
        console.error("Error getting car price:", err);
        throw new Error("Hiba az ár lekérdezésénél");
    }
}

// Mock payment processing
function processMockPayment(req, res) {
    try {
        const { cardNumber, expiryDate, cardName, cvc, amount, reservationId } = req.body;

        // Basic validation
        if (!cardNumber || !expiryDate || !cardName || !cvc || !amount) {
            return res.status(400).json({ 
                error: "Minden mező kitöltése kötelező" 
            });
        }

        // Validate card number format (masking)
        const maskedCard = `****-****-****-${cardNumber.slice(-4)}`;
        
        // Simulate payment processing with small delay
        setTimeout(() => {
            res.status(200).json({
                success: true,
                message: "Fizetés sikeres!",
                transaction: {
                    cardNumber: maskedCard,
                    expiryDate,
                    cardName,
                    amount,
                    currency: "USD",
                    timestamp: new Date().toISOString(),
                    reservationId
                }
            });
        }, 1000);

    } catch (err) {
        console.error("Payment error:", err);
        res.status(500).json({ 
            error: "Fizetési hiba történt", 
            details: err.message 
        });
    }
}

// Calculate rental amount
function calculateRentalAmount(pickupDate, returnDate, pricePerDay) {
    try {
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        
        // Calculate days between dates
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Ensure at least 1 day
        const actualDays = Math.max(1, diffDays);
        
        // Calculate total amount
        const totalAmount = actualDays * pricePerDay;
        
        return {
            days: actualDays,
            pricePerDay: parseFloat(pricePerDay),
            totalAmount: parseFloat(totalAmount.toFixed(2))
        };
    } catch (err) {
        console.error("Error calculating rental amount:", err);
        throw new Error("Hiba az ár számításánál");
    }
}

async function calculateRentalDays(pickupDate, returnDate) {
    try {
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.max(1, diffDays);
    } catch (err) {
        console.error("Error calculating rental days:", err);
        throw new Error("Hiba az napok számításánál");
    }
}

module.exports = { 
    processMockPayment, 
    calculateRentalAmount,
    getCarPriceById,
    calculateRentalDays
};
