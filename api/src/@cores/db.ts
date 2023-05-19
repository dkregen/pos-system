import * as mysql from 'mysql'

export class DB {
	connection(callback): void {
		var c
		c = mysql.createConnection({
			host: 'localhost',
			user: 'remote',
			password: 'generasioptimis',
			database: 'retail',
			port: '3306',
		})
		c.connect(err => {
			if (err) {
				console.log('DB.connection: Connection could not open.')
				console.log(err)
			} else {
				console.log('DB.connection: Connection open.')
			}

			!callback || callback(c, err)
			c.end()
			c = null
		})
	}

	log(obj: any): void {
		console.log(obj)
	}
}
