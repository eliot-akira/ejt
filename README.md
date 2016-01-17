## EJT

HTML template compiler with include, extend, variables

This is a work in progress and in active development.

## Commands

#### Include

Load *partial.html*

```html
<% include partial %>
```

#### Extend

In *index.html*

```html
<% extend layout %>

<% block header %>
..Header content..
<% end %>

..Main content..
```

In *layout.html*

```html
<header>
  <% content header %>
</header>
<main>
  <% content %>
</main>
```

#### Code

Escape code block and wrap in `<pre>` and `<code>`

```html
<% code %>
<h1>Hello</h1>
<% end %>
```

Optionally add attributes: `<% code class="language-markup" %>`


## Use

Command line

```bash
$ ejt source [destination]
```

Gulp

```js
var ejt = require('ejt/gulp');

gulp.task('html', function() {
  return gulp.src( srcPath )
    .pipe( ejt() )
    .pipe(gulp.dest( destPath ));
});
```

Express

```js
var ejt = require('ejt/express');

app.use( ejt );
```

## Credit

Originally based on [ECT](https://github.com/baryshev/ect), with changes including:

- Escape code block command
- Default file extension; relative path; filename without quotes
- Include markdown, etc. via extensions
- Plain JavaScript
