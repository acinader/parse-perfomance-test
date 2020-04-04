const cache = require('parse-server/lib/cache').default;
const Parse = require('./setup');

const productRecord = {
  name: 'SOME NAM NAME NAME',
  parentName: 'SOME NAM NAME NAME',
  ERPName: 'SOME NAM NAME NAME',
  description: 'SOME NAM NAME NAME',
  quantity: '28',
  season: 'SOME',
  sleeve: '',
  basicRate: 1899,
  ERPCode: '2423423523532',
  pattern: '',
  subCategory2: 'SLIM FIT',
  HSCode: 0,
  content: 'SOME NAM NAME NAME',
  source: '',
  category: 'JEANS',
  exciseItem: false,
  subCategory: 'SLIM FIT',
  EANCode: 24332543232532,
  neck: '',
  unitOfMeasurement: 'SOME NAM NAME NAME',
  SellingPrice: 1899,
};



// "_p_createdBy": "Employee$nqzq73IJZn",
// "_p_company": "Company$othercmpny",
// "_p_brand": "Brand$5KUm1qj624",

const deleteEverything =  async () => {
  const toDelete = ['_User', '_Session', 'Company', 'Employee', 'Brand', 'Product'];
  const schemas =  await Parse.Schema.all();
  return Promise.all(
    schemas
      .filter(schema => toDelete.includes(schema.className))
      .map((schemaObj) => {
        const schema = new Parse.Schema(schemaObj.className);
        return schema.purge();
      }));
};

const createRecord = (index) => {
  const user = new Parse.User();
  user.setUsername(`user${index}`);
  user.setPassword(`password${index}`);
  const employee = new Parse.Object('Employee', { user });
  const company = new Parse.Object('Company');
  const brand = new Parse.Object('Brand', { company });

  const attributes = {
    ...productRecord,
    ...{
      employee,
      company,
      brand,
    }
  };

  return new Parse.Object('Product', attributes);
};


const run = async () => {
  await deleteEverything();

  const recordCount = 150000;
  const batchSize = 1000;
  const batch = [];
  const promises = [];

  for(let i = 0; i < recordCount; i++) {
    batch.push(createRecord(i));
    if (batch.length === batchSize) {
      // save and empty the batch.
      const p = Parse.Object.saveAll(batch.splice(0, batch.length), { useMasterKey: true });
      promises.push(p);
    }
  }
  const p = Parse.Object.saveAll(batch, { useMasterKey: true });
  promises.push(p);
  return Promise.all(promises);
};


console.time('loadTestData');
run()
  .then(() => console.timeEnd('loadTestData'))
  .catch(console.error);
