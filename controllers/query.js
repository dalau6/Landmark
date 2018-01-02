var fuzzy = require('fuzzy')
var mysql = require('mysql')
var cloudinary = require('cloudinary')

doQuery = (query, connection, callback) => {

  q = query;
  query = query.replace(/\s\s+/g, '')
  query = '%' + query +'%';

  results = []
  id = []
  img = []
  index = 0
  list = []

  sqli = 'SELECT * FROM Estates'
  sql = 'SELECT * FROM Estates WHERE City LIKE' + connection.escape(query)
  + 'UNION SELECT * FROM Estates WHERE Zip LIKE' + connection.escape(query)
  + 'UNION SELECT * FROM Estates WHERE Address LIKE' + connection.escape(query);

  connection.query(sqli, (err, rows, fields) => {
    for(i=0; i<rows.length; i++) {
      list.push(rows[i].Address)
      list.push(rows[i].City)
      list.push(rows[i].Zip.toString())
    }
  })

  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      for(index; index<rows.length; index++) {
        results.push(rows[index])
        img.push(cloudinary.image(rows[index].Address.replace(/ /g,"_") + '.jpg', {width: 500, height: 250, crop: "scale"}))
      }
      var result = fuzzy.filter(q, list)
      var matches = result.map((el) => { return el.string; })
      matches = matches.filter((item, i, inputArray) => {
        return inputArray.indexOf(item) == i
      })
      callback(results, img, index, matches)
    } else
      console.log('Error.')
  })
}

module.exports = doQuery
