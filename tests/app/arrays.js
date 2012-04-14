define([ 'use!underscore' ], function(_) {
  describe("arrays", function() {
    var a, b, fn;

    beforeEach(function() {
      a = [ 1, 2, 3, 4 ];
      b = {
        foo : 'bar',
        baz : 'bim'
      };

       fn = function(){}
    });

    it("you should be able to determine the location of an item in an array", function() {
      fn = function(arr,i) {return a.indexOf(i) };
      expect(fn(a, 3)).to.be(2);
    });

    it("you should be able to add the values of an array", function() {
      	fn = function(arr) {
      		var a = 0;
      		for(var i = arr.length; i--;) {
      			a += arr[i];
      		}
      		return a;
      	}
      expect(fn(a)).to.be(10);
    });

    it("you should be able to remove an item from an array", function() {
      	fn = function(arr,el) {
      		var res = arr.splice(arr.indexOf(el),1);
      		return arr;
      	}
      var result = fn(a, 2);
      expect(result).to.have.length(3);
      expect(result.join(' ')).to.be('1 3 4');
    });

    it("you should be able to add an item to the end of an array", function() {
      fn = function(arr,el) {
      	arr.push(el);
      	return arr;
      }
      var result = fn(a, 10);
      expect(result).to.have.length(5);
      expect(result[result.length - 1]).to.be(10);
    });

    it("you should be able to create an array from two arrays", function() {
      fn = function(arr1,arr2) {
      	return arr1.concat(arr2)
      }
      var c = [ 'a', 'b', 'c' ],
          result = fn(a, c);

      expect(result).to.have.length(7);
      expect(result.join(' ')).to.be('1 2 3 4 a b c');
    });

    it("you should be able to add an item anywhere in an array", function() {
      fn = function(arr,el,index) {
      	arr.splice(index,0,el);
      	return arr;
      }
      var result = fn(a, 'z', 2);

      expect(result).to.have.length(5);
      expect(result.join(' ')).to.be('1 2 z 3 4');
    });
  });
});
