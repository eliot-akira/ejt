## EJT

Compiler for JavaScript-based HTML templating language

This is a work in progress.

## Commands

#### Include

Include *partial.html* inside another HTML file

```html
<% include partial %>
```

Include and render a Markdown file

```html
<% include welcome.md %>
```

Include a JSON file into a variable

```js
<% const pages = include('site.json') %>
```

#### Extend

*index.html*

```html
<% extend layout %>

<% block header %>
  ..Header content..
<% end %>

..Main content..
```

*layout.html*

```html
<header>
  <% content header %>
</header>
<main>
  <% content %>
</main>
```

Compiled result

```html
<header>
  ..Header content..
</header>
<main>
  ..Main content..
</main>
```

#### Variables

Escaped: `<%= foo %>`

Unescaped: `<%- bar %>`

#### Code

Escape code block and wrap in `<pre><code>`

```html
<% code %>
<h1>Code example</h1>
<% end %>
```

Optionally add attributes: `<% code class="language-markup" %>`

## Inline JS

You can use JavaScript between open/close tags.

Since the compiler runs on Node.js, [some ES6 features](https://nodejs.org/en/docs/es6/) are supported.

```js
<% const pages = include('site.json') %>

<ul>
  <% for (let path in pages) { %>
    <li>
      <a href="/<%- path %>"><%- pages[path] %></a>
    </li>
  <% } %>
</ul>
```

Note: the first word after the opening tag cannot be any of the reserved commands: *include*, *extend*, *content* or *block*.

#### Output

The variable `Output` is a buffer holding the compiled HTML up to that point. It can be used to add content.

```js
['item1', 'item2'].forEach((product) => {
  Output += include(`products/${product}`)
})
```

#### Local

The variable `Local` is passed to every template. It has one default property `Local.file`, which is the current template path. `Local` can be used to pass data and functions you want available in other templates.


## Use


Command line

```bash
$ ejt source [destination]
```

Compiler (server-side only)

```js
var EJT = require('ejt')
var renderer = new EJT( options )

var result = renderer.compile( src )
```

Gulp

```js
var ejt = require('ejt/gulp')

gulp.task('html', function() {
  return gulp.src( srcPath )
    .pipe( ejt() )
    .pipe(gulp.dest( destPath ))
})
```

TODO: Express

```js
var ejt = require('ejt/express');

app.use( ejt );
```

## Credit

Originally based on [ECT](https://github.com/baryshev/ect), with changes including:

- Plain JavaScript
- Default file extension; relative path; filename without quotes
- Include markdown, etc. via extensions
- New commands: code, ...
