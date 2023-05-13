#!/bin/sh -ex
PATH=$PATH:/usr/local/bin/
ROOT=$(pwd)
BUILD=$ROOT/build-dir
DEPS=$BUILD/deps
PYDEPS=$DEPS/python
LAYER_ZIP_NAME=lspd-call-handler-layer.zip
PKG_ZIP=$BUILD/$LAYER_ZIP_NAME

mkdir "$PYDEPS"
python3 -m pip install --target "$PYDEPS" -r requirements.txt
cd "$DEPS"
zip -r "$PKG_ZIP" .
echo deployable zip created at: "$PKG_ZIP"

echo Package successful