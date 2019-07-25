var DB = {
  dbName: 'webrsDB',
  slqVersion: '1',
  dbVersion: 1,
  storeName: 'RSStore',
  indexedDB: window.indexedDB || window.webkitIndexedDB,
  db: {},
  store: null,
  errorCode: {
    open: 91001,
    save: 91002,
    get: 91003,
    delete: 91004,
    deleteAll: 91005
  },
  createStore: function(dbName, callback) {
    var txn, store
    if (DB.indexedDB) {
      txn = DB.db[dbName].transaction(DB.storeName, 'readwrite')
      store = txn.objectStore(DB.storeName)
    } else {
      store = DB.db[dbName].transaction(function(tx) {
        tx.executeSql(
          'create table if not exists ' +
            DB.storeName +
            ' (key text, value text null)',
          [],
          function(ts, result) {
            callback && callback()
          }
        )
      })
    }
    return store
  },
  open: function(callback, dbName) {
    if (DB.indexedDB) {
      if (!DB.db[dbName]) {
        var request = DB.indexedDB.open(dbName, DB.dbVersion)
        request.onerror = function(e) {
          callback({ code: DB.errorCode.open, error: e })
        }
        request.onsuccess = function(e) {
          if (!DB.db[dbName]) {
            DB.db[dbName] = e.target.result
          }
          var store = DB.createStore(dbName)
          callback(store)
        }
        request.onupgradeneeded = function(e) {
          DB.db[dbName] = e.target.result
          var store = DB.db[dbName].createObjectStore(DB.storeName, {
            keyPath: 'key'
          })
          callback(store)
        }
      } else {
        var store = DB.createStore(dbName)
        callback(store)
      }
    } else {
      if (!DB.db[dbName]) {
        DB.db[dbName] = openDatabase(
          dbName,
          DB.slqVersion,
          'websqlDBl',
          30 * 1024 * 1024
        )
      }
      DB.createStore(dbName, callback)
    }
  },
  save: function(key, value, callback) {
    var dbName = DB.dbName
    if (DB.indexedDB) {
      var inData = {
        key: key,
        value: value
      }
      DB.open(function(result) {
        var error = result.hasOwnProperty('error')
        if (error) {
          callback && callback(result)
        } else {
          var request = result.put(inData)
          request.onsuccess = function(e) {
            callback && callback({ success: true })
          }
          request.onerror = function(e) {
            callback && callback({ code: DB.errorCode.save, error: e })
          }
        }
      }, dbName)
    } else {
      value = JSON.stringify(value)
      DB._websqldelete(
        key,
        function(result) {
          if (result.hasOwnProperty('error')) {
            callback(result)
          } else {
            DB.db[dbName].transaction(function(ts) {
              ts.executeSql(
                'insert into ' + DB.storeName + '(key,value) values(?,?) ',
                [key, value],
                function(ts, result) {
                  callback && callback({ success: true })
                },
                function(ts, e) {
                  callback && callback({ code: DB.errorCode.save, error: e })
                }
              )
            })
          }
        },
        dbName
      )
    }
  },
  get: function(key, callback) {
    var dbName = DB.dbName
    if (DB.indexedDB) {
      DB.open(function(result) {
        var error = result.hasOwnProperty('error')
        if (error) {
          callback(result)
        } else {
          var request = result.get(key)
          request.onsuccess = function(e) {
            var data = e.target.result ? e.target.result.value : undefined
            callback({ data: data, success: true })
          }
          request.onerror = function(e) {
            callback({ code: DB.errorCode.get, error: e })
          }
        }
      }, dbName)
    } else {
      DB.open(function() {
        DB.db[dbName].transaction(function(ts) {
          ts.executeSql(
            'select * from ' + DB.storeName + ' where key=? ',
            [key],
            function(ts, result) {
              var data
              if (result) {
                for (var i = 0; i < result.rows.length; i++) {
                  data = result.rows.item(i)
                }
                if (data) {
                  data = data.value
                  try {
                    data = JSON.parse(data)
                  } catch (e) {}
                }
              }
              callback({ data: data, success: true })
            },
            function(ts, e) {
              callback({ code: DB.errorCode.get, error: e })
            }
          )
        })
      }, dbName)
    }
  },
  delete: function(key, callback) {
    var dbName = DB.dbName
    if (DB.indexedDB) {
      DB.open(function(result) {
        var error = result.hasOwnProperty('error')
        if (error) {
          callback && callback(result)
        } else {
          var request = result.get(key)
          request.onsuccess = function(e) {
            var recode = e.target.result
            if (recode) {
              request = result.delete(key)
            }
            callback && callback({ success: true })
          }
          request.onerror = function(e) {
            callback && callback({ code: DB.errorCode.delete, error: e })
          }
        }
      }, dbName)
    } else {
      DB._websqldelete(key, callback, dbName)
    }
  },
  deleteAll: function(callback) {
    var dbName = DB.dbName
    if (DB.indexedDB) {
      DB.open(function(result) {
        var error = result.hasOwnProperty('error')
        if (error) {
          callback && callback(result)
        } else {
          result.clear()
          callback && callback({ success: true })
        }
      }, dbName)
    } else {
      DB.open(function() {
        DB.db[dbName].transaction(function(ts) {
          ts.executeSql(
            'delete from ' + DB.storeName + '',
            [],
            function(ts, result) {
              callback && callback({ success: true })
            },
            function(ts, e) {
              callback && callback({ code: DB.errorCode.deleteAll, error: e })
            }
          )
        })
      }, dbName)
    }
  },
  _websqldelete: function(key, callback, dbName) {
    DB.open(function() {
      DB.db[dbName].transaction(function(ts) {
        ts.executeSql(
          'delete from ' + DB.storeName + ' where key = ? ',
          [key],
          function(ts, result) {
            callback && callback({ success: true })
          },
          function(ts, e) {
            callback && callback({ code: DB.errorCode.delete, error: e })
          }
        )
      })
    }, dbName)
  }
}
function Security() {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  return (
    now.getFullYear().toString() +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 89 + 100).toString() +
    'WEBRS'
  )
}
const key = 'NetworkSecurityCenter'
const data = Security()
DB.save(key, data, function(result) {
  if (result.success) {
  } else {
    console.log(
      'Network Security Project Department reminds you that there are risks in the current environment, please operate with caution!'
    )
  }
})
