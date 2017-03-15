# JavaScript les 2

## JavaScript onderwerpen

### Arrays
```
var arr = [
    1,
    1,
    2,
    3,
    5,
    8
];
```

#### Array for loops
```
var total = 0;
for (var i = 0; i < arr.length; i++) {
    total += arr[i];
}
console.log(total);
```

#### Array forEach loops
```
var total = 0;
arr.forEach(function (number) {
    total += number;
});
console.log(total);
```

#### Array maps
```
var exponents = arr.map(function (number) {
    return number * number;
});
console.log(exponents);
```

### Objects

#### Simple Objects
```
var car = {
    brand: '',
    numWheels: 4
}
```

#### Complex Objects
```
var Car = {
    wheels: 4,
    options: [
        'Cruise control',
        'Electrical windows'
    ],
    drive: function() {
        console.log("Driving");
    }
}
```

#### Object inheritance
```
var Person = {
    walk: function(){
        console.log('Walking');
    }
}

var Girl = Object.create(Person);
Girl.gender = 'female';

var Boy = Object.create(Person);
Boy.gender = 'male';

var thomas = Object.create(Boy);
thomas.name = 'Thomas';

console.log(thomas.gender);
thomas.walk();
```

#### React bestaat eigenlijk ook uit Objecten
```
var App = {
    render: function () {
        return (
            // HTML elementen
        );
    }
}
```
## Uitbreiding Weather app

* Switch tussen metric en default units?

* Switch tussen nu, 24 uur weer, 3 dagen vooruit kijken?

* Gebruik eigen locatie voor ophalen van weer, combi `window.navigator` Google API

* Dashboard styling: add Sass?