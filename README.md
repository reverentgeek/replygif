# replygif JavaScript client

This is a simple Node.js client for the [ReplyGif  API](http://replygif.net/about).

## Install

```
> npm install replygif
```

## Usage

### Search gifs

Searching for gifs requires an `options` parameter and a callback function. The `options` parameter must contain a value for one of three properties: `id`, `tag`, or `reply`.

Options:

```
const options = {
  id: "",            // ID of a gif to retrieve.
  tag: "",           // Tag terms to search. Multiple values can be separated by commas.
  tagOperator: "",   // When searching multiple tag terms, possible values are: "and", "or", or "not". Defaults to "and".
  reply: "",         // Reply terms to search. Multiple values can be separated by commas. Example: "angry"
  replyOperator: ""  // When searching multiple reply values, possible values are: "and", "or", or "not". Defaults to "and".
}
```

Sample request:

```
const client = require( "replygif" );
const options = { tag: "yes" };
client.gifs( options, ( err, gifs ) => {
  // Do something with gifs
} );
```

Sample response:

```
[
  {
    "id": "1540",
    "tags": [
      "nod",
      "yes",
      "Taylor Swift"
    ],
    "caption": [],
    "url": "http://replygif.net/1540",
    "file": "http://replygif.net/i/1540.gif"
  },
  {
    "id": "1529",
    "tags": [
      "yes",
      "nod",
      "confused",
      "Jim Carrey",
      "Dumb &amp; Dumber"
    ],
    "caption": [],
    "url": "http://replygif.net/1529",
    "file": "http://replygif.net/i/1529.gif"
  }
]
```

### Search tags

Searches for tag terms.

Options:

```
const options = {
  title: "",    // Tag title to search. Multiple values can be separated by commas. Example: "yes"
  reply: "",    // Reply terms to search. Multiple values can be separated by commas. Example: "angry"
}
```

Sample request:

```
const client = require( "replygif" );
const options = { reply: "yes" };
client.tags( options, ( err, tags ) => {
  // Do something with tags
} );
```

Sample response:

```
[
  {
    "title": "agreeing",
    "id": "95",
    "reaction": true,
    "url": "http://replygif.net/t/agreeing",
    "reply": "Yes",
    "count": "23"
  },
  {
    "title": "nod",
    "id": "83",
    "reaction": true,
    "url": "http://replygif.net/t/nod",
    "reply": "Yes",
    "count": "47"
  },
  {
    "title": "yes",
    "id": "82",
    "reaction": true,
    "url": "http://replygif.net/t/yes",
    "reply": "Yes",
    "count": "47"
  }
]
```

### Retrieve all reply terms

Returns all reply terms.

Sample request:

```
const client = require( "replygif" );
client.replies( ( err, replies ) => {
  // Do something with replies
} );
```

Sample response (partial):

```
[
  {
    "title": "Angry",
    "id": "849",
    "url": "http://replygif.net/r/angry",
    "count": "8"
  },
  {
    "title": "Awkward",
    "id": "851",
    "url": "http://replygif.net/r/awkward",
    "count": "3"
  },
  {
    "title": "Ellipsis",
    "id": "850",
    "url": "http://replygif.net/r/ellipsis",
    "count": "5"
  }
]
```
