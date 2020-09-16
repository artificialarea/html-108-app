# Questions

## See also...
**[./docs/footnotes.js](https://github.com/artificialarea/html-108-app/blob/master/docs/footnotes.js)**

## 1.
Appears that my strategy is to make fetch api calls to **`GET /api/users`** and **`GET /api/compositions`** to get ALL the database data, and then filter the data clientside depending on the route.

**Question: At what point would I have to alter this strategy to get more granular with my GET requests?** The particular scenario I'm thinking of is making a specified fetch call for **`GET api/compositions?id`** when going to a **`URL /track/:trackId`** route. When might such a scenario arise? Would the number of compositions in the db table (and thus the K-size of the JSON response body) ever become too large that would require such an action?


## 2. `Vercel.json`
Which one to use?

originally, per: https://courses.thinkful.com/react-v1/checkpoint/18

```
{
    "version": 2,
    "routes": [
        { "handle": "filesystem" },
        { "src": "/.*", "dest": "/index.html" }
    ]
}
```

change to? 
per: https://courses.thinkful.com/node-postgres-v1/checkpoint/20#full-stack-bookmarks

```
{
  "version": 2,
  "routes": [
    {
      "src": "^/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": ".*",
      "dest": "/index.html"
    }
  ]
}
```

