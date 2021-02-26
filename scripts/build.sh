#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    node scripts/build.js

    mkdir -p dist
    cp -r build/* dist

    # TODO: let wepack do all that.
    sed 's:[/\\&]:\\&:g' dist/src/injected.js | head -n 2 | tail -1 > dist/src/injected_prepared.js
    node scripts/replaceContent.js

    mv dist/index.html dist/popup.html
}

build