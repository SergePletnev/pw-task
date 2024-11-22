export class HomePage {
    constructor(page) {
        this.page = page
        this.tabA = page.getByText('Tab A')
        this.tableRows = page.locator('#table-id tr')
        this.popup = page.locator('#popup-id')
        this.dropdownSelector = 'select';
    }

    async navigateToTabA() {
        await this.tabA.click()
    }

    async getTableData() {
        const rows = await this.tableRows.all();
        let tableData = [];
        for (const row of rows) {
          const rowData = await row.locator('td').allTextContents()
          tableData.push(rowData)
        }
        return tableData
    }
    
    async validatePopupData(row, expectedValues) {
        const nameCell = await row.locator('td:nth-child(1)')
        await nameCell.click()
    
        const dropdowns = await this.popup.locator(this.dropdownSelector).all()
        const dropdownValues = []
        for (const dropdown of dropdowns) {
            dropdownValues.push(await dropdown.inputValue())
        }
    
        for (let i = 0; i < dropdownValues.length; i++) {
            if (dropdownValues[i] !== expectedValues[i + 1]) {
              throw new Error(
                `Mismatch at row: dropdown value (${dropdownValues[i]}) does not match table value (${expectedValues[i + 1]})`
                )
            }
        }
    
        await this.popup.locator('#close-button').click()
    }
}
