export class TabAPage {
    constructor(page) {
        this.page = page
        this.tableRows = page.locator('#table-a tr')
        this.scoreColumn = 'td:nth-child(4)'
    }

    async getTableRows() {
        return await this.tableRows.all()
    }
}
