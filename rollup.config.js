import buble from "rollup-plugin-buble";

const NAME = "RMatch";

export default {
    input: "index.js",
    output: [
        {
            file: "build/umd.js",
            format: "umd",
            name: NAME
        },
        {
            file: "build/cjs.js",
            format: "cjs"
        },
        {
            file: "build/iife.js",
            format: "iife",
            name: NAME
        }
    ],
    sourceMap: false,
    plugins: [buble()]
};
