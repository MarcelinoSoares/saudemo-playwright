import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { users } from '../fixtures/users';
import { products } from '../fixtures/products';

test.describe('Inventory Page', () => {
	let loginPage: LoginPage;
	let inventoryPage: InventoryPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		await loginPage.navigate();
		await loginPage.login(
			users.standardUser.username,
			users.standardUser.password
		);
	});

	test('should display inventory page', async ({}) => {
		await inventoryPage.assertInventoryPage();
	});

	test('should sort products correctly', async ({}) => {
		const lowestPrice = products.onesie.price;
		const firstItemName = products.backpack.name;

		await inventoryPage.selectProductSortOption('Price (low to high)');
		await inventoryPage.verifyFirstItemPrice(lowestPrice);
		await inventoryPage.selectProductSortOption('Name (A to Z)');
		await inventoryPage.verifyFirstItemInList(firstItemName);
	});

	test('should display product details correctly', async ({}) => {
		const itemName = products.backpack.name;
		const itemDescription = products.backpack.description;
		const itemPrice = products.backpack.price;

		await inventoryPage.searchItemExistsInInventory(itemName);
		await inventoryPage.clickOnInventoryItem(itemName);
		await inventoryPage.verifyItemDetails(itemName, itemDescription, itemPrice);
		await inventoryPage.backToProducts();
		await inventoryPage.assertInventoryPage();
	});
test('should verify all products descriptions on inventory page', async ({}) => {
	await inventoryPage.verifyItemDescriptions(Object.values(products));
});

test('should verify all products prices on inventory page', async ({}) => {
	await inventoryPage.verifyItemPrices(Object.values(products));
});

test('should search for items and verify search results', async ({}) => {
	const existingItem = products.backpack.name;
	const nonExistingItem = 'Non-existent Product';

	// Search for an existing item
	await inventoryPage.searchItem(existingItem);
	await inventoryPage.assertItemInSearchResults(existingItem);

	// Search for a non-existing item
	await inventoryPage.searchItem(nonExistingItem);
	await inventoryPage.assertItemNotInSearchResults(nonExistingItem);
});
});
