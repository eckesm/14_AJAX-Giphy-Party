// console.log("Let's get this party started!");

const giphyKey = 'ea0yw5rmxNx3g7gHYRcPpKJsf1KRG38U';
const examples = [
	'https://media4.giphy.com/media/12m6M9cySmlph6/giphy.gif',
	'https://media1.giphy.com/media/l0ExtAWrKKI70nnKo/giphy.gif',
	'https://media3.giphy.com/media/118A3TUPCSiw6Y/giphy.gif',
	'https://media0.giphy.com/media/VGmCC4CXydM1G/giphy.gif',
	'https://media4.giphy.com/media/XkDyB1jCZMxUs/giphy.gif',
	'https://media2.giphy.com/media/PibhPmQYXZ7HO/giphy.webp?cid=ecf05e471nhn5uv8r30qkrggeg603qcafev76i2ymx82vq2n&rid=giphy.webp',
	'https://media0.giphy.com/media/RhrAmVUHxjTQvEPBWi/giphy.webp?cid=ecf05e471nhn5uv8r30qkrggeg603qcafev76i2ymx82vq2n&rid=giphy.webp',
	'https://media4.giphy.com/media/IWOEH2zDGka88/giphy.gif',
	'https://media1.giphy.com/media/YBw5ri0F4MFU63iEp0/giphy.gif'
];

/* ******************************************************************
------------------------ Search & Add GIF ---------------------------
****************************************************************** */

async function getGifUrl(api_key, tag) {
	const res = await axios.get('https://api.giphy.com/v1/gifs/random', { params: { api_key, tag } });
	console.log(tag + ': ' + res.data.data.image_url);
	url = res.data.data.image_url;
	addGifToContainer(url);
}

function addGifToContainer(url) {
	const newGif = document.createElement('img');
	newGif.classList.add('img-thumbnail');
	newGif.classList.add('m-3');
	const gifContainer = document.querySelector('#gifContainer');
	newGif.src = url;
	gifContainer.append(newGif);
}

// to populate the contianer with examples in case the maximim API limit is reached
function populateGifContainer(array) {
	for (let gif of array) {
		addGifToContainer(gif);
	}
}

// playing around with adding cards instead of GIFs
// function populateCards(array) {
// 	for (let gif of array) {
//     const title='Title'
//     const caption='caption'
//     const link=gif
//     const newCard=

//     `<div class="card">
//     <img src="${gif}" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${title}</h5>
//       <p class="card-text">${caption}</p>
//       <a href="${link}" class="btn btn-primary">Go somewhere</a>
//     </div>
//   </div>`

//   const gifContainer = document.querySelector('#gifContainer');
//   gifContainer.innerHTML+=newCard

// 	}
// }

/* ******************************************************************
------------------------ When the DOM Loads -------------------------
****************************************************************** */
const searchbutton = document.querySelector('#searchbutton');
searchbutton.addEventListener('click', function(e) {
	e.preventDefault();
	const note = document.querySelector('#noteToUser');
	note.innerHTML = '';
	const tag = document.querySelector('#searchinput').value;
	getGifUrl(giphyKey, tag);
});

const clearbutton = document.querySelector('#clearbutton');
clearbutton.addEventListener('click', function() {
	const note = document.querySelector('#noteToUser');
	note.innerHTML = 'What, you hate GIFs???';
	const gifContainer = document.querySelector('#gifContainer');
	gifContainer.innerHTML = '';
});
