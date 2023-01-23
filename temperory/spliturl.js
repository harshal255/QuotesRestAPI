const url = "http://res.cloudinary.com/dlsxq98fr/image/upload/v1674419307/sgto573ppheooxe1ktvl.jpg"
const array = url.split('/')
console.log(array);

const img = array[array.length-1];
console.log(img);
const imgName = img.split('.')[0];
console.log(imgName);

