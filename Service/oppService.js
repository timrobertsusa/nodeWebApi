let fs = require('fs');
const { debug } = require('console');

const FILE_NAME = './assets/opps.json';

let oppService = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let opp = JSON.parse(data).find(p => p.id == id);
        resolve(opp);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let opps = JSON.parse(data);
        // Perform search
        if (searchObject) {
          opps = opps.filter(
            p => (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name) >= 0 : true));
        }

        resolve(opps);
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let opps = JSON.parse(data);
        opps.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
          if (err) {
            reject(err);
          }
          else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let opps = JSON.parse(data);
        let opp = opps.find(p => p.id == id);
        if (opp) {
          Object.assign(opp, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(opps), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let opps = JSON.parse(data);
        let index = opps.findIndex(p => p.id == id);
        if (index != -1) {
          opps.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(opps), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(index);
            }
          });
        }
      }
    });
  }
};

module.exports = oppService;
