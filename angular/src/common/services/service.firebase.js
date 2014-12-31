angular.module('service.firebase', ['firebase'])

    // a simple utility to create write batches to Firebase paths
    .factory('firebaseBatch', ['firebaseRef', function (firebaseRef)
    {
        return function (values,cb)
        {
           async.forEachSeries(values,
           function (value,done)
           {
                var errorHandler= function (err)
                    {
                        if (err)
                          done({ err: err, value: value });
                        else 
                          done();
                    };

                if (value.remove)
                  firebaseRef.apply(null,value.remove).remove(errorHandler);
                else
                if (value.priority)
                  firebaseRef.apply(null,value.path).setWithPriority(value.data,value.priority,errorHandler);
                else
                  firebaseRef.apply(null,value.path).set(value.data,errorHandler);
           },
           cb); 
        };
    }])

    // a simple utility to create references to Firebase paths
    .factory('firebaseRef', ['$firebase', 'FBURL', function ($firebase, FBURL) {
        /**
         * @function
         * @name firebaseRef
         * @param {String|Array...} path
         * @return a Firebase instance
         */
        return function (path) {
            return new Firebase("https://burning-fire-386.firebaseio.com");
          //  return new Firebase(pathRef([FBURL].concat(Array.prototype.slice.call(arguments))));
        }
    }])

    // a simple utility to create $firebase objects from angularFire
    .service('syncData', ['$firebase', 'firebaseRef', function ($firebase, firebaseRef) {
        /**
         * @function
         * @name syncData
         * @param {String|Array...} path
         * @param {int} [limit]
         * @return a Firebase instance
         */
        return function (path, limit) {
            var ref = firebaseRef(path);
            limit && (ref = ref.limit(limit));
            return $firebase(ref);
        }
    }]);

function pathRef(args) {
    for (var i = 0; i < args.length; i++) {
        if (typeof(args[i]) === 'object') {
            args[i] = pathRef(args[i]);
        }
    }
    return args.join('/');
}
