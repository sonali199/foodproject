const { calculatePrice } = require('../services/pricingService');

// Controller function to handle price calculation request
const calculateDeliveryPrice = async (req, res) => {
    try {
        // Extract necessary inputs from request body
        const { zone, organization_id, total_distance, item_type } = req.body;
        
        // Call the service function to calculate the price
        const totalPrice = await calculatePrice(zone, organization_id, total_distance, item_type);
        
        // Send the calculated total price as response
        res.json({ total_price: totalPrice });
    } catch (error) {
        // Handle errors
        console.error("Error calculating delivery price:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    calculateDeliveryPrice,
};