#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    node scripts/build.js

    mkdir -p dist
    cp -r build/* dist

    sed '/PLACEHOLDER/{
        s/PLACEHOLDER//g
        r dist/src/content_injected.js
    }' src/content/content.template.js > dist/src/content.js
    mv dist/index.html dist/popup.html
}

build