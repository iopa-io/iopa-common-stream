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
 
var iopaStream = require('../src/iopaStream.js');
var should = require('should');
var assert = require('assert');

describe('#IncomingMessageStream()', function() {
     it('should have append function', function() {
       var body = new iopaStream.IncomingMessageStream();
       var buf = new Buffer('test');
       body.append(buf.slice());
    });
});

describe('#IncomingStream()', function() {
     it('should have append function', function() {
       var body = new iopaStream.IncomingStream();
       var buf = new Buffer('test');
       body.append(buf.slice());
    });
});

describe('#OutgoingStream()', function() {
       var body;
        var buf;
        
      beforeEach(function(done){
           body = new iopaStream.OutgoingStream();
           buf = new Buffer('test');
   
          body.write(buf, 'utf8', done);
      })
      
     it('should  pass through data unchanged', function() {
         
         var buf2 = body.read();
         
         // use assert.deepEqual instead of should.equal due to node.js 4.0.0 change in buffers
         //buf2.should.equal(buf);
         assert.deepEqual(buf2, buf);
        
    });
});

describe('#OutgoingMessageStream()', function() {
       var body;
        var buf;
        
      beforeEach(function(done){
           body = new iopaStream.OutgoingMessageStream();
           buf = new Buffer('test');
   
          body.write(buf, 'utf8', done);
      })
      
     it('should  pass through data unchanged', function() {
         
         var buf2 = body.read();
         
         // use assert.deepEqual instead of should.equal due to node.js 4.0.0 change in buffers
         //buf2.should.equal(buf);
         assert.deepEqual(buf2, buf);
        
    });
});

describe('#OutgoingStreamTransform()', function() {
       var body, body2;
        var buf;
        
      beforeEach(function(done){
          
           body = new iopaStream.OutgoingMessageStream();
           buf = new Buffer('test');
   
           body2 = new iopaStream.OutgoingStreamTransform(
               function(chunk, encoding, done){
                   
                   var chunk2 = new Buffer(chunk.toString('utf8').toUpperCase());
                   body.write(chunk2, encoding, done);
                });
   
           body2.write(buf, 'utf8', done);
      })
      
     it('should transform input to upper case', function() {
         body.toString().should.equal('TEST');
    });

});

describe('#OutgoingNoPayloadStream()', function() {
      
     it('should have OutgoingNoPayloadStream', function() {
         iopaStream.should.have.property("OutgoingNoPayloadStream");
    });

});

describe('#OutgoingMultiSendStream()', function() {
      
     it('should have OutgoingMultiSendStream', function() {
         iopaStream.should.have.property("OutgoingMultiSendStream");
    });

});

describe('#EmptyStream()', function() {
      
     it('should have EmptyStream', function() {
         iopaStream.should.have.property("EmptyStream");
    });

});

describe('#BufferStream()', function() {
      
     it('should have BufferStream', function() {
         iopaStream.should.have.property("BufferStream");
    });

});
