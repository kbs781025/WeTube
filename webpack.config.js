const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    module: {
        rules: [
            {
                test: /\.(scss)$/, // Not {}
                use: ExtractCSS.extract([
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugin() { return [autoprefixer({browsers: "cover 99.5%"})]; }
                        }
                    },
                    {
                        loader:"sass-loader"
                    }
                ])
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "bundle.js"
    },
    plugins: [new ExtractCSS("style.css")]
};

module.exports = config; // Not export