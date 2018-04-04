# Match-path

Esta clase crea un objeto que enseña con 2 propiedades importantes:

* path  : este enseña solo el path de la ruta, dividido en un arreglo
* query : este enseña la query de la ruta, dividido en un objeto

## Match-path::match

el método match, de la instancia de **Match-route**, permite ejecutar la ruta de origen como template de ruta,
en base a los siguientes parámetros:

* `{param}` : param será el nombre del **parámetro obligatorio** almacenado en el retorno de match
* `{param?}` : param será el nombre del **parámetro opcional** almacenado en el retorno de match
* `{...param}` : param será el nombre del **parámetro de grupo** almacenado en el retorno de match

si la comparación no cumple con el template de ruta este retorna falso

### Match-path::match, Ejemplo

```javascript

import Route from "match-path";

let route = new Route('/path1/{subpath}')

   console.log(route.match('/path1/path2')) // {subpath : 'path2'}

```