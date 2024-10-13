const fs = require('fs');
const { storage } = require("../server/controllers/initializers");

// read products
let items = JSON.parse(fs.readFileSync("products.json", "utf-8"));

let urls = [
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-13102024-105530%2Fphoto-1.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-10102024-092215%2Fphoto-2.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-09102024-141455%2Fphoto-3.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-HT-07102024-084522%2Fphoto-4.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-BD-05102024-063314%2Fphoto-5.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-01102024-152255%2Fphoto-6.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-29092024-113010%2Fphoto-7.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-27092024-191840%2Fphoto-8.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-25092024-105023%2Fphoto-9.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-22092024-161650%2Fphoto-10.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-11102024-161245%2Fphoto-11.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-06102024-103410%2Fphoto-12.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-BD-05102024-154532%2Fphoto-13.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-03102024-131528%2Fphoto-14.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-HT-01102024-102550%2Fphoto-15.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-27092024-091825%2Fphoto-16.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-11102024-161245%2Fphoto-17.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-06102024-103410%2Fphoto-18.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-BD-05102024-154532%2Fphoto-19.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-03102024-131528%2Fphoto-20.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-HT-01102024-102550%2Fphoto-21.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-27092024-091825%2Fphoto-22.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-28092024-172030%2Fphoto-23.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-29092024-141825%2Fphoto-24.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-05102024-113030%2Fphoto-25.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-02102024-084520%2Fphoto-26.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-ALL-01102024-171545%2Fphoto-27.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-07102024-151015%2Fphoto-28.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-ALL-30092024-123035%2Fphoto-29.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-15102024-090540%2Fphoto-30.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-16102024-134525%2Fphoto-31.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-18102024-072050%2Fphoto-32.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-20102024-151530%2Fphoto-33.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-22102024-160010%2Fphoto-34.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-24102024-141040%2Fphoto-35.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-26102024-120530%2Fphoto-36.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-28102024-084020%2Fphoto-37.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-30102024-231530%2Fphoto-38.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-01112024-055515%2Fphoto-39.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-02112024-142500%2Fphoto-40.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-ALL-04112024-094050%2Fphoto-41.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-18112024-141545%2Fphoto-42.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-20112024-115030%2Fphoto-43.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-22112024-153000%2Fphoto-44.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-24112024-090000%2Fphoto-45.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-26112024-124530%2Fphoto-46.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-28112024-161000%2Fphoto-47.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-30112024-075500%2Fphoto-48.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-CT-02122024-132015%2Fphoto-49.jpg',
    'https://storage.googleapis.com/login-371ec.appspot.com/EDEN%2Faccessories%2Ftemp%2FSTK-DG-04122024-100545%2Fphoto-50.jpg'
];

let index = 0;
Array.from(items).forEach(item => {
    items[index]['photoUrls'] = {
        "photo-1": urls[index],
        "photo-2": urls[parseInt(Math.random() * 10)],
        "photo-3": urls[parseInt(Math.random() * 10)],
        "photo-4": urls[parseInt(Math.random() * 10)],
        "photo-5": urls[parseInt(Math.random() * 10)]
    }
    index += 1;
});
fs.writeFileSync("products1.json", JSON.stringify(items));

// // read photos
// let photos = fs.readdirSync("photos");
// console.log(items.length);
// console.log(photos.length);


// // uploading images
// let photoIndex = 0;
// Promise.all(
//     Array.from(items).map((item => {
//         console.log("Uploading")
//         photoIndex += 1
//         return storage.bucket().upload(
//             `photos/${photos[photoIndex]}`, 
//             { 
//                 destination: `EDEN/accessories/temp/${item['id']}/photo-${photoIndex}.jpg` 
//             }
//         );
//     }))
// )
// .then(async (response) => {
//     // putting photo urls together
//     var photoUrls = [];
//     var count = 0;
//     for (var file in response) {
//         console.log(response[file][0].publicUrl());
//         photoUrls.push(response[file][0].publicUrl());
//     }
//     console.log(photoUrls);
// });