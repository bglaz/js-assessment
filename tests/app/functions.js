define([ 'use!underscore' ], function(_) {
  describe("functions", function() {
    var sayIt = function(greeting, name, punctuation) {
          return greeting + ', ' + name + (punctuation || '!');
        },
        fn = function() {};

    it("you should be able to use an array as arguments when calling a function", function() {
      
      var fn = function(args) {
      	return sayIt.apply(this,args);
      }
      
      var result = fn([ 'Hello', 'Ellie', '!' ]);
      expect(result).to.be('Hello, Ellie!');
    });

    it("you should be able to change the context in which a function is called", function() {
      var speak = function() {
            return sayIt(this.greeting, this.name, '!!!');
          },
          obj = {
            greeting : 'Hello',
            name : 'Rebecca'
          };

      var fn = function() {
      	return speak.apply(obj);
      }
      
      // following test will pass
      expect(fn()).to.be('Hello, Rebecca!!!');
    });

    it("you should be able to return a function from a function", function() {
      
      var fn = function(arg) {
      	return function(arg2) { return arg + ', ' + arg2}
      }
      
      expect(fn('Hello')('world')).to.be('Hello, world');
    });

    it("you should be able to create a 'partial' function", function() {
      var fn = function(fnc,arg1,arg2) {
      	return function(arg3) {
      		return fnc(arg1,arg2,arg3);
      	}
      }
      var partial = fn(sayIt, 'Hello', 'Ellie');
      expect(partial('!!!')).to.be('Hello, Ellie!!!');
    });

    it("you should be able to use arguments", function () {
      fn = function () {
        var result = 0;
        for(var i = arguments.length; i--;) {
        	result += arguments[i];
        }
        return result;
      };

      var a = Math.random(), b = Math.random(), c = Math.random(), d = Math.random();
      expect(fn(a)).to.be(a);
      expect(fn(a, b)).to.be(a + b);
      expect(fn(a, b, c)).to.be(a + b + c);
      expect(fn(a, b, c, d)).to.be(a + b + c + d);
    });

    it("you should be able to apply functions", function () {
      fn = function (fun) {
       var args = Array.prototype.slice.call(arguments);
       args.splice(0,1);
       fun.apply(this,args);
      };

      (function () {
        var a = Math.random(), b = Math.random(), c = Math.random();

        var wasITake2ArgumentsCalled = false;
        var iTake2Arguments = function (firstArgument, secondArgument) {
          expect(arguments.length).to.be(2);
          expect(firstArgument).to.be(a);
          expect(secondArgument).to.be(b);

          wasITake2ArgumentsCalled = true;
        };

        var wasITake3ArgumentsCalled = false;
        var iTake3Arguments = function (firstArgument, secondArgument, thirdArgument) {
          expect(arguments.length).to.be(3);
          expect(firstArgument).to.be(a);
          expect(secondArgument).to.be(b);
          expect(thirdArgument).to.be(c);

          wasITake3ArgumentsCalled = true;
        };

        fn(iTake2Arguments, a, b);
        fn(iTake3Arguments, a, b, c);
      })();
    });

    it("you should be able to curry existing functions", function () {
      fn = function (fun) {
       var args = Array.prototype.slice.call(arguments);
       args.splice(0,1);
        return function() {
        	var args2 = Array.prototype.slice.call(arguments);
        	return fun.apply(this,args.concat(args2));
        }
      };

      var curryMe = function (x, y, z) {
        return x / y * z;
      };

      var a = Math.random(), b = Math.random(), c = Math.random();
      expect(fn(curryMe)(a, b, c)).to.be(curryMe(a, b, c));
      expect(fn(curryMe, a)(b, c)).to.be(curryMe(a, b, c));
      expect(fn(curryMe, a, b)(c)).to.be(curryMe(a, b, c));
      expect(fn(curryMe, a, b, c)()).to.be(curryMe(a, b, c));
      expect(fn(curryMe, a, b, c)()).to.be(curryMe(a, b, c));
      expect(fn(curryMe, b, a, c)()).to.be(curryMe(b, a, c));
    });

    it('you should be able to use closures', function () {
      var arr = [Math.random(), Math.random(), Math.random(), Math.random()];
      var doSomeStuff;

      fn = function (vals) {
        var results = [];
        var makeFunc = function(arg) { return function() { return arg*arg;} };
        for(var i=0, len = vals.length; i<len; i++) {
			results.push(makeFunc(vals[i]));
        }
        return results;
      };

      doSomeStuff = function (x) { return x * x; };

      var funcs = fn(arr);
      expect(funcs).to.have.length(arr.length);
      for (var i = funcs.length - 1; i >= 0; i--) {
        expect(funcs[i]()).to.be(doSomeStuff(arr[i]));
      };
    });
  });
});
