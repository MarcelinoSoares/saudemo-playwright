/**
 * Product data for the Sauce Demo application.
 * 
 * This object contains information about all products available in the Sauce Demo store.
 * Each product has a consistent set of properties:
 * - id: The product ID (string)
 * - name: The product name (string)
 * - price: The product price (number)
 * - description: The product description (string)
 * - selector: A selector that can be used to locate the product in the UI (string)
 */
export const products = {
	backpack: {
		id: '4',
		name: 'Sauce Labs Backpack',
		price: 29.99,
		description:
			'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
		selector: 'text=Sauce Labs Backpack',
	},
	bikeLight: {
		id: '0',
		name: 'Sauce Labs Bike Light',
		price: 9.99,
		description:
			"A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
		selector: 'text=Sauce Labs Bike Light',
	},
	boltTShirt: {
		id: '1',
		name: 'Sauce Labs Bolt T-Shirt',
		price: 15.99,
		description:
			'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
		selector: 'text=Sauce Labs Bolt T-Shirt',
	},
	fleeceJacket: {
		id: '5',
		name: 'Sauce Labs Fleece Jacket',
		price: 49.99,
		description:
			"It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
		selector: 'text=Sauce Labs Fleece Jacket',
	},
	onesie: {
		id: '2',
		name: 'Sauce Labs Onesie',
		price: 7.99,
		description:
			"Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
		selector: 'text=Sauce Labs Onesie',
	},
	redTShirt: {
		id: '3',
		name: 'Test.allTheThings() T-Shirt (Red)',
		price: 15.99,
		description:
			'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
		selector: 'text=Test.allTheThings() T-Shirt (Red)',
	},
};
