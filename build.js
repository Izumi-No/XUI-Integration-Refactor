#!/usr/bin/env node

const { build } = require("estrella")
const tsPaths = require("esbuild-ts-paths") 
const { nodeExternalsPlugin } = require('esbuild-node-externals');

build({
  entry: "index.ts",
  outfile: "dist/bundle.js",platform: 'node',
  bundle: true,
  plugins: [tsPaths(
            "./tsconfig.json" 
),nodeExternalsPlugin()]
})