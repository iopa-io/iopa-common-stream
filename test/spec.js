var iopaStream = require('../src/iopaStream.js');
var should = require('should');

describe('#IncomingMessageStream()', function() {
     it('should have append function', function() {
       var body = new iopaStream.IncomingMessageStream();
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
      
     it('should have toString function', function() {
         body.toString().should.equal('test');
    });
    
     it('should have toBuffer function', function() {
        body.toBuffer().should.equal(buf);
    });
});

describe('#OutgoingStreamTransform()', function() {
       var body, body2;
        var buf;
        
      beforeEach(function(done){
          
           body = new iopaStream.OutgoingStream();
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
