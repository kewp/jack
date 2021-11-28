# json2html
Split your static website into separate components

## simple idea

you define the structure of your page with a single
json object:

```json
{
  "main": [
    "header",
    "body",
    "footer" 
  ],
  "header": [
    { "top_btn": "home" },
    { "top_btn": "logout" }
  ],
  "body": ...,
  "footer: ...
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
     {child}
  </body>
</html>
```

note how `{child}` specifies where the children go.

more interestingly is `top_btn.html` which takes in a variable:

```html
<button>{var}</button>
```

## generate

to execute we just run on the json:

```sh
node json2html.js input.json
```

by default it searches for the html files in the current directory
and outputs to `index.html`.

## why

it's a simple way to split a page up into separate components.
everything in html follows the parent/child / tree paradigm.
i don't like how cluttered pure html is and i don't like how
complex ui libraries are. let's see if this approach has legs.
