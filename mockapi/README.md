# Mock API

The mock api uses a support library for axios called `axios-mock-adapter`, this will turn all our API calls into fake calls
fetching information from a JSON file, keep in mind that this file needs to be updated.

## Activate, Deactive mock api

In order to turn on/off our mock endpoints we just need to set the flag `enableAdapters` to `true` or `false`  in the ```src/config/dev```

```javascript
let config = {
  appEnv: 'dev',
  enableAdapters: false
};
```
## Create a Mock Endpoint

To create a mock endpoint, first we need to create an API call.

```javascript
const getThing = () => {
  return api.get( 'things' );
};
```

then we need to create an adapter for that API call, we will use `axios-mock-adapter` library for that.

```javascript
import MockAdapter from 'axios-mock-adapter';
import db from 'mockapi/db.json';
...
const mock = new MockAdapter( axiosInstance );

mock.onGet( 'things' ).reply( 200, db.things )
...
```

make sure to create the *things* property in the `db.json` file.

```json
{
  "things": [
    {
      "id": 1,
      "name": "Shiny fake stuff"
    },
    {
      "id": 2,
      "name": "I'm also fake"
    },
    {
      "id": 3,
      "name": "Definitely not fake"
    },
    {
      "id": 4,
      "name": "definitely fake stuff"
    }
  ]
}
```
bear in mind that enabling the adapters our APP wont make any request to any the server.

[Click here for more info.](https://github.com/ctimmerm/axios-mock-adapter)
