import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('even.db')

export class DB {
    static init() {
      return new Promise((resolve, reject) => {
          db.transaction(tx => {
              tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS event (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, date TEXT, remind TEXT NOT NULL, repeat TEXT)',
                  [],
                   resolve,
                  (_, error) => reject(error )
              )
          })
      })
    }

    static initTheme() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS theme (the INTEGER)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static getEvents() {
        return new Promise((resolve, reject) => {
           db.transaction(tx => {
               tx.executeSql('SELECT * FROM event',
                   [],
                   (_, result) => resolve(result.rows._array),
                   (_, error) => reject(error)
                   )
           })
        })
    }

    static createEvent({text, date, remind, repeat}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO event (text, date, remind, repeat) VALUES (?, ?, ?, ?)',
                    [text, date, remind, repeat],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                    )
            })
        })
    }
    static removeEvent(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM event WHERE id = ?',
                    [id],
                    resolve,
                    (_, error) => reject(error )
                )
            })
        })
    }


    static getTheme() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM theme',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static enableLight() {
        return new Promise((resolve, reject) => {
            db.transaction(tx =>
                tx.executeSql(
                    'UPDATE theme SET the = 0',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            )
        })
    }
    static enableDark() {
        return new Promise((resolve, reject) => {
            db.transaction(tx =>
                tx.executeSql(
                    'UPDATE theme SET the = 1',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            )
        }) }

    static insertTheme() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO theme (the) VALUES (?)',
                    [0],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }



}
