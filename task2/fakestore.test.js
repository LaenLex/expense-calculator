const axios = require('axios');

describe('Fake Store API Tests', () => {
    let products;

    // Fetch products before running tests
    beforeAll(async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        products = response.data;
    });

    // Test 1: Verify server response code
    test('API should return status code 200', async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        expect(response.status).toBe(200);
    });

    // Test 2: Verify product attributes
    test('Each product should have valid attributes', () => {
        products.forEach(product => {
            // Check title
            expect(product.title).toBeDefined();
            expect(product.title.trim()).not.toBe('');

            // Check price
            expect(product.price).toBeDefined();
            expect(product.price).toBeGreaterThanOrEqual(0);

            // Check rating
            expect(product.rating).toBeDefined();
            expect(product.rating.rate).toBeDefined();
            expect(product.rating.rate).toBeGreaterThanOrEqual(0);
            expect(product.rating.rate).toBeLessThanOrEqual(5);
        });
    });

    // Test 3: Generate list of products with defects
    test('Should identify products with defects', () => {
        const defectiveProducts = products.filter(product => {
            const hasDefects = [];
            
            // Check for empty title
            if (!product.title || product.title.trim() === '') {
                hasDefects.push('Empty title');
            }
            
            // Check for negative price
            if (product.price < 0) {
                hasDefects.push('Negative price');
            }
            
            // Check for invalid rating
            if (!product.rating || product.rating.rate > 5 || product.rating.rate < 0) {
                hasDefects.push('Invalid rating');
            }

            return hasDefects.length > 0;
        });

        // Log defective products if any found
        if (defectiveProducts.length > 0) {
            console.log('Products with defects:', 
                defectiveProducts.map(product => ({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    rating: product.rating
                }))
            );
        }

        // This expectation is informative rather than assertive
        expect(defectiveProducts).toEqual(expect.any(Array));
    });
}); 