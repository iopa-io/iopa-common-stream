/*
 * Copyright (c) 2015 Internet of Protocols Alliance (IOPA)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var util = require('util');
var stream = require('stream');
var Readable  = stream.Readable;
var Writable = stream.Writable;
var Transform = stream.Transform;
var BufferList = require('bl');

Writable.prototype.endAsync = function endAsync(chunk, encoding) {
  var self= this;
  return new Promise(function(resolve, reject){
        self.once("finish", function(){process.nextTick(resolve); });
        self.end(chunk, encoding);
  });
}

Transform.prototype.endAsync = function endAsync(chunk, encoding) {
  var self= this;
  return new Promise(function(resolve, reject){
        self.once("end", function(){process.nextTick(resolve); });
        self.end(chunk, encoding);
  });
}

/**
 * Represents an IOPA Incoming Message Body 
 *
 * @class IncomingMessagetream
 * @constructor
 */
function IncomingStream() {
  Readable.call(this)
  this._lastId = 0
}

util.inherits(IncomingStream, Readable);

IncomingStream.prototype.append = function(buf) {
  if (!this.readable)
    return;

  this.push(buf);
};

IncomingStream.prototype.close = function() {
  this.push(null);
  this.emit('finish');
};

// nothing to do, data will be pushed from the server
IncomingStream.prototype._read = function() {}

module.exports.IncomingStream = IncomingStream;

/**
 * Represents an IOPA Incoming Message Body 
 *
 * @class IncomingMessagetream
 * @constructor
 */
function IncomingMessageStream() {
  BufferList.call(this)
}

util.inherits(IncomingMessageStream, BufferList);

IncomingMessageStream.prototype.toBuffer = function() {
  return this.slice();
}

IncomingMessageStream.prototype.toString = function() {
   return this.slice().toString();
}

module.exports.IncomingMessageStream = IncomingMessageStream;

/**
 * Represents an IOPA Incoming Message Body for objects
 *
 * @class IncomingObjectStream
 * @constructor
 */
function IncomingObjectStream() {
  Readable.call(this, { objectMode : true });
  this.objs
}

util.inherits(IncomingObjectStream, Readable);

IncomingObjectStream.prototype._read = function () {
};

IncomingObjectStream.prototype.append = function(obj) {
  if (!this.readable)
    return;

  this.push(obj);
};

IncomingObjectStream.prototype.close = function() {
  this.push(null);
  this.emit('finish');
};

module.exports.IncomingObjectStream = IncomingObjectStream;

/**
 * Represents an IOPA Outgoing Message Body for send-once protocols (e.g., HTTP Request)
 *
 * @class OutgoingDuplexStream
 * @constructor
 */
function OutgoingMessageStream(buf) {
  BufferList.call(this, buf);
  this._firstwrite = false;
 }

util.inherits(OutgoingMessageStream, BufferList);

OutgoingMessageStream.prototype._write = function (chunk, encoding, done) {
  if (!this._firstwrite)
  {
    this._firstwrite = true;
     this.emit('start');
  }
  
  BufferList.prototype._write.call(this, chunk, encoding, done);
};

OutgoingMessageStream.prototype.toBuffer = function() {
  return this.slice();
}

OutgoingMessageStream.prototype.toString = function() {
   return this.slice().toString();
};

module.exports.OutgoingMessageStream = OutgoingMessageStream;

/**
 * Represents an IOPA Outgoing Message Body for send-once protocols (e.g., HTTP Request)
 *
 * @class OutgoingDuplexStream
 * @constructor
 */
function OutgoingStream(buf) {
  Transform.call(this);
    this._firstwrite = false;
    if (buf)
    this.write(buf);
 }

util.inherits(OutgoingStream, Transform);

OutgoingStream.prototype._transform = function(chunk, encoding, cb) {
  if (!this._firstwrite)
    {
      this._firstwrite = true;
      this.emit("start");
    }
   
  this.push(chunk, encoding);
  cb();
};

module.exports.OutgoingStream = OutgoingStream;

/**
 * Represents an IOPA Stream that Transforms data using supplied function
 *
 * @class OutgoingStream
 * @constructor
 */
function OutgoingStreamTransform(transformFunc) {
  Writable.call(this);
  this._write = transformFunc;
 }

util.inherits(OutgoingStreamTransform, Writable);

module.exports.OutgoingStreamTransform = OutgoingStreamTransform;

var EmptyBuffer = new Buffer(0);

/**
 * Represents an IOPA Outgoing Message Body for no payload protocols (e.g., MQTT Acknowledge)
 *
 * @class OutgoingNoPayloadStream
 * @constructor
 */
function OutgoingNoPayloadStream() {
  Writable.call(this);
}

util.inherits(OutgoingNoPayloadStream, Writable);

OutgoingNoPayloadStream.prototype._write = function (chunk, encoding, done) {
   throw new Error("Stream does not support payload data in IOPA Body");
};

OutgoingNoPayloadStream.prototype.toBuffer = function() {
  return EmptyBuffer;
};

OutgoingNoPayloadStream.prototype.toString = function() {
  return "";
};

module.exports.OutgoingNoPayloadStream = OutgoingNoPayloadStream;

/**
 * Represents an IOPA Outgoing Message Body for multi-send protocols (e.g., COAP Observe, MQTT, WebSocket)
 *
 * @class OutgoingMultiSendStream
 * @constructor
 */
function OutgoingMultiSendStream() {
  Writable.call(this);

  this._counter = 0;
  this._firstwrite = false;
  this.lastData = EmptyBuffer;
}

util.inherits(OutgoingMultiSendStream, Writable);

OutgoingMultiSendStream.prototype._write = function write(data, encoding, callback) {
   if (!this._firstwrite)
  {
    this._firstwrite = true;
     this.emit('start');
  }
  
 // this._context["iopa.Headers"]["Observe"] = ++this._counter;
 
  if (this._counter === 16777215)
    this._counter = 1;
  
  this.lastData = data;
  this.emit('data', data);

  callback();
};

OutgoingMultiSendStream.prototype.toBuffer = function() {
  return this.lastData;
};

OutgoingMultiSendStream.prototype.toString = function() {
   return this.lastData.toString();
};

module.exports.OutgoingMultiSendStream = OutgoingMultiSendStream;

module.exports.EmptyStream =  new BufferList();

module.exports.BufferStream =  BufferList;