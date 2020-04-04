const indexTest = async function indexTest() {
  console.time('timelog');

  const Product = Parse.Object.extend('Product');
  const query = new Parse.Query(Product);
  query.limit(1000000);
  const res = await query.find();
  console.timeEnd('timelog');
  console.time('timelog');
  console.log(`resp size==${+res.length}`);
  console.timeEnd('timelog');
  return res.length;
};

Parse.Cloud.define('indexTest', indexTest);
