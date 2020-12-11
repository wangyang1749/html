function resolveAfter2Seconds() {
    setTimeout(() => {
       console.log("1234")
    }, 2000);
}
// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve('resolved');
//         }, 2000);
//     });
// }
// async function asyncCall() {
//     console.log('calling');
//     const result = await resolveAfter2Seconds();
//     console.log(result);
//     // expected output: 'resolved'
// }
async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    console.log('calling');
    // expected output: 'resolved'
}

asyncCall();