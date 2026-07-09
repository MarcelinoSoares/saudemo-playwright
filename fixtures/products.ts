export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  addToCartId: string;
  removeId: string;
}

export const products: Record<string, Product> = {
  backpack: {
    id: '4',
    name: 'Sauce Labs Backpack',
    price: 29.99,
    description:
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    addToCartId: 'add-to-cart-sauce-labs-backpack',
    removeId: 'remove-sauce-labs-backpack',
  },
  bikeLight: {
    id: '0',
    name: 'Sauce Labs Bike Light',
    price: 9.99,
    description:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    addToCartId: 'add-to-cart-sauce-labs-bike-light',
    removeId: 'remove-sauce-labs-bike-light',
  },
  boltTShirt: {
    id: '1',
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    description:
      'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    addToCartId: 'add-to-cart-sauce-labs-bolt-t-shirt',
    removeId: 'remove-sauce-labs-bolt-t-shirt',
  },
  fleeceJacket: {
    id: '5',
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
    description:
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    addToCartId: 'add-to-cart-sauce-labs-fleece-jacket',
    removeId: 'remove-sauce-labs-fleece-jacket',
  },
  onesie: {
    id: '2',
    name: 'Sauce Labs Onesie',
    price: 7.99,
    description:
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    addToCartId: 'add-to-cart-sauce-labs-onesie',
    removeId: 'remove-sauce-labs-onesie',
  },
  redTShirt: {
    id: '3',
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.99,
    description:
      'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    addToCartId: 'add-to-cart-test.allthethings()-t-shirt-(red)',
    removeId: 'remove-test.allthethings()-t-shirt-(red)',
  },
};

export const TOTAL_PRODUCT_COUNT = 6;

export const sortExpectations = {
  nameAtoZ: {
    first: products.backpack.name,
    last: products.redTShirt.name,
  },
  nameZtoA: {
    first: products.redTShirt.name,
    last: products.backpack.name,
  },
  priceLowToHigh: {
    firstPrice: products.onesie.price,
  },
  priceHighToLow: {
    firstPrice: products.fleeceJacket.price,
  },
};
