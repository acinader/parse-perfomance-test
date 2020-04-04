# parse-perfomance-test

Example test for https://github.com/parse-community/parse-server/issues/6543

```
npm install
npm start
```

Load data
```
node ./loadTestData
```

### Laptop Test Environment ###
MacBook Air (Retina, 13-inch, 2018)
Processor: 1.6 GHz Dual-Core Intel Core i5
Memory: 16 GB 2133 MHz LPDDR3

ParseServer: 4.2.0
MongoDB: 3.6.8

directAccess: TRUE

- loadTestData: 10592064.298ms (2.9 Hours)

### Laptop test run:

client:
```
➜  parse-playground git:(master) ✗ curl -v -X POST \
  -H "X-Parse-Application-Id: playground" \
  -H "X-Parse-Master-Key: playground" \
  -H "Content-Type: application/json" \
  http://localhost:1337/parse/functions/indexTest
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 1337 (#0)
> POST /parse/functions/indexTest HTTP/1.1
> Host: localhost:1337
> User-Agent: curl/7.64.1
> Accept: */*
> X-Parse-Application-Id: playground
> X-Parse-Master-Key: playground
> Content-Type: application/json
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS
< Access-Control-Allow-Headers: X-Parse-Master-Key, X-Parse-REST-API-Key, X-Parse-Javascript-Key, X-Parse-Application-Id, X-Parse-Client-Version, X-Parse-Session-Token, X-Requested-With, X-Parse-Revocable-Session, Content-Type, Pragma, Cache-Control
< Access-Control-Expose-Headers: X-Parse-Job-Status-Id, X-Parse-Push-Status-Id
< Content-Type: application/json; charset=utf-8
< Content-Length: 17
< ETag: W/"11-9R/ubop5sghJTzu5ShurS5BvN4c"
< Date: Sat, 04 Apr 2020 23:25:59 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{"result":150000}* Closing connection 0
```

And the server output:
```
[33345] parse-server running on http://localhost:1337/parse
timelog: 16574.886ms
resp size==150000
timelog: 0.834ms
info: Ran cloud function indexTest for user undefined with:
  Input: {}
  Result: 150000 {"functionName":"indexTest","params":{}}
```

So for the 150,000 test records I created, a query to pull all of them into a javascript array took 16.5 seconds

