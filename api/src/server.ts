import { App } from './app'

const app = new App()
const PORT = 8000

app.listen(PORT, () => console.log(`Server running on ${ PORT }!`))
