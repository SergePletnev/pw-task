import { LoginPage } from './loginPage'
import { HomePage } from './homePage'
import { TabAPage } from './tabAPage'


export class PageManager {
    constructor(page) {
        this.page = page   
        this.loginPage = new LoginPage(this.page)
        this.homePage = new HomePage(this.page)
        this.tabAPage = new TabAPage(this.page)
    }
}
