# jack

`jack` produces HTML from JSON
and HTML fragments.

the JSON describes the layout

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

where each name corresponds to an HTML
fragment.

e.g. `main.html` might look like

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

i'm always frustrated that i cannot see the structure
of my html pages at a glance. pure html is too
cluttered, and frameworks have too many moving parts.

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

## string replace

it occurs to me this library actually has nothing to do with
html - it's really a string replacement mechanism. the templates
could be anything.
