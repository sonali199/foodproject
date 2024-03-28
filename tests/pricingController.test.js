const request = require('supertest');
const app = require('../index'); // Assuming your Express app instance is exported from index.js
const { calculateDeliveryCost } = require('../services/pricingService');

// Mocking the pricing service function
jest.mock('../services/pricingService', () => ({
    calculateDeliveryCost: jest.fn()
}));

describe('PricingController', () => {
    describe('POST /pricing/calculatePrice', () => {
        it('should calculate the delivery price and return 200 OK with the total price', async () => {
            // Mock input data
            const input = {
                zone: 'central',
                organization_id: '001',
                total_distance: 10,
                item_type: 'perishable'
            };
// Mocking the pricing service function to return a specific total price
calculateDeliveryCost.mockResolvedValue(20.5);

// Send request to the endpoint
const response = await request(app)
    .post('/pricing/calculatePrice')
    .send(input);

// Assertions
expect(response.status).toBe(200);
expect(response.body.total_price).toBe(20.5);
});

it('should return 500 Internal Server Error if an error occurs during calculation', async () => {
// Mock input data
const input = {
    zone: 'central',
    organization_id: '001',
    total_distance: 10,
    item_type: 'perishable'
};

// Mocking the pricing service function to throw an error
calculateDeliveryCost.mockRejectedValue(new Error('Test error'));

// Send request to the endpoint
const response = await request(app)
    .post('/pricing/calculatePrice')
    .send(input);

// Assertions
expect(response.status).toBe(500);
expect(response.body.error).toBe('Internal Server Error');
});
});
});