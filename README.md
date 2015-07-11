# [![IOPA](http://iopa.io/iopa.png)](http://iopa.io)<br> iopa-server 

[![Build Status](https://api.shippable.com/projects/55a1607dedd7f2c052682a4d/badge?branchName=master)](https://app.shippable.com/projects/55a1607dedd7f2c052682a4d) 
[![IOPA](https://img.shields.io/badge/iopa-middleware-99cc33.svg?style=flat-square)](http://iopa.io)
[![limerun](https://img.shields.io/badge/limerun-certified-3399cc.svg?style=flat-square)](https://nodei.co/npm/limerun/)

[![NPM](https://nodei.co/npm/iopa-common-stream.png?downloads=true)](https://nodei.co/npm/iopa-common-stream/)

## About
`iopa-common-stream` is is a core utility library to create iopa.Body streams  

Written in plain javascript for maximum portability to constrained devices

## Status

Working beta, not for production servers

Includes:

### IOPA Stream (reference classes)

  * Base framework to write your own IoPA server (e.g., MQTT over TCP)
  
  
## Installation

    npm install iopa-common-stream

## Usage
``` js
const iopaStream = require('iopa-common-stream');
    
const OutgoingNoPayloadStream = iopaStream.OutgoingNoPayloadStream;
    , IncomingMessageStream = iopaStream.IncomingMessageStream
    , OutgoingStream = iopaStream.OutgoingStream
    , OutgoingStreamTransform = iopaStream.OutgoingStreamTransform
    , OutgoingNoPayloadStream = iopaStream.OutgoingNoPayloadStream
    , EmptyStream = iopaStream.EmptyStream
    , BufferStream = iopaStream.BufferStream;
``` 
       
See [`iopa-mqtt`](https://nodei.co/npm/iopa-mqtt/) for a reference implementation of this package
