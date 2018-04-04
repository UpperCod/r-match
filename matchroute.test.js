let Route = require("./build/umd");

test("route : /", () => {
    let route = new Route("/");
    expect(route.match("/")).toMatchObject({});
});

test("route : /{param}", () => {
    let route = new Route("/{param}");
    expect(route.match("/first_param")).toMatchObject({ param: "first_param" });
    expect(route.match("/")).toEqual(false);
});

test("route : /{param?}", () => {
    let route = new Route("/{param?}");
    expect(route.match("/first_param")).toMatchObject({ param: "first_param" });
    expect(route.match("/")).toMatchObject({});
});

test("route : /{...param}", () => {
    let route = new Route("/{...param}");
    expect(route.match("/first_param")).toMatchObject({
        param: ["first_param"]
    });
    expect(route.match("/")).toEqual(false);
});

test("route : /{...param?}", () => {
    let route = new Route("/{...param?}");
    expect(route.match("/first_param")).toMatchObject({
        param: ["first_param"]
    });
    expect(route.match("/")).toMatchObject({});
});

test("route : /?id={param}", () => {
    let route = new Route("/?id={param}");
    expect(route.match("/?id=10")).toMatchObject({
        param: "10"
    });
    expect(route.match("/")).toEqual(false);
});

test("route : /?id={param?}", () => {
    let route = new Route("/?id={param?}");
    expect(route.match("/?id=10")).toMatchObject({
        param: "10"
    });
    expect(route.match("/")).toMatchObject({});
});
