# jack

`jack` produces HTML from a JSON template and HTML fragments.
for example the JSON might look like:

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

every name is assumed to correspond to an html
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
they are inserted in order, i.e.

```html
 ...
 <body>
    {header will go here}
    {body will go here}
    {footer will go here}
  </body>
  ...
```

note how `top_btn` takes in a variable allowing for
customisation. `top_btn.html` might look like

```html
<button>{var}</button>
```

hopefully that makes what `jack` is clear.

## why

it's a simple way to split a page up into separate components.
i don't like how cluttered pure html is and using a framework
seems overkill for a static site.

## console usage

to execute on the console we use `jack.js`

```sh
node jack.js
```

it takes in a lot of options which you can see with `node jack.js --help`.

## library usage

`jack.js` exports several methods you can use to generate
HTML strings. I still need to publish this to npm.

## live script

for my own development there is a script called _live_ run with
`npm run live` which builds `examples/landing`, serves it via
`localhost:8000` and watches for any changes, either to the
`examples/landing` folder or to the library itself (`jack.js`).
