# jack

define the structure of your page with a
json object:

```json
{
  "main": {
    "header": [
      { "top_btn": "home" },
      { "top_btn": "logout" }
    ],
    "body": {},
    "footer": {}
  }
}
```

every name is assumed to have a corresponding html
file, e.g. `main.html` and `header.html`.

`main.html` might look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App</title>
  </head>
  <body>
     {slot}
  </body>
</html>
```

here `{slot}` specifies where the children go.

also `top_btn.html` takes in a variable allowing for
customisation, e.g.

```html
<button>{var}</button>
```

## generate

to execute we just run on the json:

```sh
node jack.js
```

it takes in a lot of options which you can see with `node jack.js --help`.

## why

it's a simple way to split a page up into separate components.
i don't like how cluttered pure html is and using a framework
seems overkill for a static site.

## live script

for my own development there is a script called _live_ run with
`npm run live` which builds `examples/landing`, serves it via
`localhost:8000` and watches for any changes, either to the
`examples/landing` folder or to the library itself (`jack.js`).
