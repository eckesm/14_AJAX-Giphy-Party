console.log("Let's get this party started!");

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
-------------------- Search & Add GIFs & Cards ----------------------
****************************************************************** */

async function getGifUrl(api_key, tag) {
	const res = await axios.get('https://api.giphy.com/v1/gifs/random', { params: { api_key, tag } });
	console.log(tag + ': ' + res.data.data.image_url);
	url = res.data.data;
	const gifRadio = document.querySelector('#gifRadio').checked;
	gifRadio ? addGifToContainer(url.image_url) : addCardToContainer(url);
}

function addGifToContainer(url) {
	// console.log('gif:', url);

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

function addCardToContainer(url) {
	// console.log('card:', url);

	const image = url.image_url;
	const title = url.title;
	const source = url.source;

	const newCard = `<div class="card m-3" style="width: 18rem;">
	<img src="${image}" class="card-img-top" alt="${title}">	
	<div class="card-body">
			<p class="card-text"><b><Title: </b>${title}</p>
			<a href="${source}" class="btn btn-primary">Go to Source</a>
		</div>
	</div>`;

	const gifContainer = document.querySelector('#gifContainer');
	gifContainer.innerHTML += newCard;
}

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
