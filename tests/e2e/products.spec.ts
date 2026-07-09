import {test} from '@playwright/test';
import {InventoryPage} from '../../pages/inventory-page';
import {loginAsStandardUser} from '../../helpers/authHelper';
import {products, sortExpectations, TOTAL_PRODUCT_COUNT} from '../../fixtures/products';

test.describe('Products Page', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({page}) => {
    inventoryPage = new InventoryPage(page);
    await loginAsStandardUser(page);
  });

  test('should display inventory page', async () => {
    await inventoryPage.assertInventoryPage();
  });

  test('should display all 6 products', async () => {
    await inventoryPage.verifyProductCount(TOTAL_PRODUCT_COUNT);
  });

  test('should sort products A to Z', async () => {
    await inventoryPage.selectProductSortOption('Name (A to Z)');
    await inventoryPage.verifyFirstItemInList(sortExpectations.nameAtoZ.first);
    await inventoryPage.verifyLastItemInList(sortExpectations.nameAtoZ.last);
  });

  test('should sort products Z to A', async () => {
    await inventoryPage.selectProductSortOption('Name (Z to A)');
    await inventoryPage.verifyFirstItemInList(sortExpectations.nameZtoA.first);
    await inventoryPage.verifyLastItemInList(sortExpectations.nameZtoA.last);
  });

  test('should sort products by price low to high', async () => {
    await inventoryPage.selectProductSortOption('Price (low to high)');
    await inventoryPage.verifyFirstItemPrice(sortExpectations.priceLowToHigh.firstPrice);
  });

  test('should sort products by price high to low', async () => {
    await inventoryPage.selectProductSortOption('Price (high to low)');
    await inventoryPage.verifyFirstItemPrice(sortExpectations.priceHighToLow.firstPrice);
  });

  test('should display product details correctly', async () => {
    const item = products.backpack;

    await inventoryPage.searchItemExistsInInventory(item.name);
    await inventoryPage.clickOnInventoryItem(item.name);
    await inventoryPage.verifyItemDetails(item.name, item.description, item.price);
    await inventoryPage.backToProducts();
    await inventoryPage.assertInventoryPage();
  });

  test('should verify all products descriptions on inventory page', async () => {
    await inventoryPage.verifyItemDescriptions(Object.values(products));
  });

  test('should verify all products prices on inventory page', async () => {
    await inventoryPage.verifyItemPrices(Object.values(products));
  });
});
