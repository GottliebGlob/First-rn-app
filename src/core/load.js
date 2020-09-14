import {DB} from './db'


export async function bootstrap() {
    try {
        await DB.init()
        await DB.initTheme()
        console.log('Database started')
    }
    catch (e) {
        console.log('Error: ', e)
    }
}
