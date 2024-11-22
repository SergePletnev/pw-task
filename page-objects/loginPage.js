export class LoginPage {
    constructor(page) {
        this.page = page
        this.userNameField = page.locator('#username')
        this.passwordField = page.locatorocator('#password')
        this.loginButton = page.locatorocator('#login-button')
    }

    async login(userName, password) {
        await this.userNameField.fill(userName)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }
}
