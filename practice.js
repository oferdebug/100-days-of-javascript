// const celsiusToFahrenheit = (c) => {
//     return c* 9/5 +32
// }

// const fahrenheitToCelsius = (f) => {
//     return (f-32) * 5/9
// }

// console.log(celsiusToFahrenheit(100))
// console.log(celsiusToFahrenheit(0))
// console.log(fahrenheitToCelsius(212))




// const makeCounter = (start = 0) => {
//     let count = start
//     return {
//         increment:() => { count = count + 1 },
//         decrement: () => { count = count - 1 },
//         reset: () => { count = start },
//         value:()=>count
//     }
// }



// const c = makeCounter(10)
// c.increment()
// c.increment()
// console.log(c.value()) // צריך: 12
// c.decrement()
// console.log(c.value()) // צריך: 11
// c.reset()
// console.log(c.value()) // צריך: 10


// const grades = [85, 42, 91, 67, 55, 78, 33, 96]
// const average = grades.reduce((a, b) => a + b, 0) / grades.length
// const passing = grades.filter(g => g >= 60);
// const letters=grades.map(g=>{
//     if(g>=90){
//         return "A"
//     }else if(g>=80){
//         return "B"
//     }else if(g>=70){
//         return "C"
//     }else if(g>=60){
//         return "D"
//     }else{
//         return "F"
//     }
// })
// console.log("average:", average);
// console.log("grades:", grades);
// console.log("length:", grades.length);
// console.log("passing:", passing);
// console.log("passing length:", passing.length);
// console.log("letters:", letters);


// const age = 25
// let age2 = 30
// console.log(age);
// console.log(age2);


// let age = 25
// console.log(age);

// age = 30
// console.log(age);



// const name = "ofer"
// const age = 30
// const isStudent = true


// console.log(typeof name)
// console.log(typeof age)
// console.log(typeof isStudent)


// const empty = null
// let notDefined

// console.log(typeof empty)
// console.log(typeof notDefined)

// function greet(name) {
//     console.log('Hello ' + name);
// } 


// greet('Ofer')
// greet('Dana')
// greet('Yossi')


// function add(a, b) {
//     return a+b
// }


// const result = add(5, 3)
// console.log(result)


// function withLog(a, b) {
//     console.log(a+b)
// }


// function withReturn(a, b) {
//  return a+b   
// }


// const r1 = withLog(5, 3)
// const r2 = withReturn(5, 3)

// console.log(r1)
// console.log(r2)


//function addOld(a, b) {
  //  return a+b
//}


//const addNew = (a, b) => {
  //  return a+b
//}

//console.log(addOld(5, 3))
//console.log(addNew(5, 3))




