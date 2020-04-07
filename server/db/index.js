const mysql = require("mysql")

const conn = mysql.createPool({
    connectionLimit: 10,
    password: 'pass',
    user: 'root',
    database: 'DB_Schedule',
    host: 'localhost',
    port: '3307'
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

schedule.create = (start, end, title) => {

    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO hourly (start, end, title) VALUES ("${start}", "${end}", "${title}") `, (err, results) => {
            if(err) {
                return reject(err)
            }
          return resolve({
            start,
            end,
            title,
          })
        })
    })
}

schedule.update = (start, end, title, id) => {

    return new Promise((resolve, reject) => {
        conn.query(`UPDATE hourly set start=?, end=?, title=? where id = ? `,[start, end, title, id], (err, results) => {
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

schedule.delete = (id) => {

    return new Promise((resolve, reject) => {
        conn.query(`DELETE FROM hourly where id = ? `,id, (err, results) => {
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

module.exports = schedule