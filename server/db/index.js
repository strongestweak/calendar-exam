const mysql = require("mysql")

const conn = mysql.createPool({
    connectionLimit: 10,
    password: 'password',
    user: 'root',
    database: 'DB_Schedule',
    host: 'localhost',
    port: '3306'
})

let schedule = {};

schedule.all = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * from hourly`, (err, results) => {
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

schedule.one = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * from hourly WHERE id =?`, id, (err, results) => {
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

schedule.create = (start, duration, title) => {

    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO hourly (start, duration, title) VALUES (${start}, ${duration}, "${title}") `, (err, results) => {
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

schedule.update = (start, duration, title, id) => {

    return new Promise((resolve, reject) => {
        conn.query(`UPDATE hourly set start=?, duration=?, title=? where id = ? `,[start, duration, title, id], (err, results) => {
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}


module.exports = schedule