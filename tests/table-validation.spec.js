import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';


test.describe('Table data and dropdown validation', () => {
  let pm
  
  test.beforeEach(async ({ page }) => {
      await page.goto('https://random-application-url.com')
      pm = new PageManager(page)
      await pm.loginPage.login('username', 'password')
  })

  test('print rows and count scores > 0.5', async ({ page }) => {
    pm = new PageManager(page)
    await pm.homePage.navigateToTabA()

    const rows = await pm.tabAPage.getTableRows()
    console.log('Table Rows:');
    for (const row of rows) {
      const rowText = await row.textContent()
      console.log(rowText)
    }

    let count = 0;
    for (const row of rows) {
      const scoreCell = await row.locator(pm.tabAPage.scoreColumn).textContent(); 
      const score = parseFloat(scoreCell.trim())
      if (score > 0.5) {
        count++;
      }
    }

    console.log(`Number of rows with score > 0.5: ${count}`)
  });

  test('validate popup dropdown values match table columns', async ({ page }) => {
    pm = new PageManager(page)
    const tableData = await pm.homePage.getTableData()

    for (let i = 0; i < tableData.length; i++) {
      const tableRowElement = pm.homePage.tableRows.nth(i)
      const rowData = tableData[i]
      await pm.homePage.validatePopupData(tableRowElement, rowData)
    }

    console.log('All rows validated successfully!');
  })
})
