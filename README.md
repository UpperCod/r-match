# r-path

This class creates an object that teaches with 2 important properties:

* path  : this property shows the path of the route, divided into an array
* query : this property shows the query of the route, divided into an object

## Match-path::match

The match method of the **Match-route** instance allows you to execute the source route as a route template,
based on the following parameters:

* `{param}` : **param** will be the name of the **mandatory parameter** stored in the match return
* `{param?}` : **param** will be the name of the **optional parameter** stored in the match return
* `{...param}` : **param** will be the name of the **group parameter** stored in the match return

si la comparación no cumple con el template de ruta este retorna falso

### Match-path::match, Example

```javascript

import Route from "r-path";

let route = new Route('/path1/{subpath}')

   console.log(route.match('/path1/path2')) // {subpath : 'path2'}

```