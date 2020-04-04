const indexTest = async function indexTest(req) {
  console.time('timelog');

  var Product = Parse.Object.extend('Product');
  var query = new Parse.Query(Product);
  query.limit(1000000)
  var res = await query.find();
  console.timeEnd('timelog');
  console.time('timelog');
  console.log('resp size=='+res.length)
  console.timeEnd('timelog');
  return res.length;
};

Parse.Cloud.define('indexTest', indexTest);
