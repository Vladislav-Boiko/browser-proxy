#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    node scripts/build.js

    mkdir -p dist
    cp -r build/* dist

    # TODO: let wepack do all that.
    sed -e "s/\"PLACEHOLDER\"/\`$(sed 's:[/\\&]:\\&:g' dist/src/injected.js)\`/" dist/src/content_template.js > dist/src/content.js
    rm -f dist/src/content_template.js dist/src/injected.js

    mv dist/index.html dist/popup.html
}

build