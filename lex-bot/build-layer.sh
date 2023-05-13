#!/bin/sh -ex
PATH=$PATH:/usr/local/bin/
ROOT=$(pwd)
BUILD=$ROOT/build-dir
DEPS=$BUILD/deps
LAYER_ZIP_NAME=lspd-call-handler-layer.zip
PKG_ZIP=$BUILD/$LAYER_ZIP_NAME
LAYER_NAME=lspd-call-handler-layer

rm -rf "$BUILD"/
mkdir "$BUILD"
mkdir "$DEPS"

docker pull lambci/lambda:build-python3.8
docker run -v "$PWD":/var/task --rm lambci/lambda:build-python3.8 ./pkg.sh

#aws s3 sync $BUILD s3://$S3_DEPL_BUCKET/ --exclude='*' \
#--include="$LAYER_ZIP_NAME" --size-only

aws lambda publish-layer-version --layer-name $LAYER_NAME \
--zip-file fileb://$PKG_ZIP

echo Build successful