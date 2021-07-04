$('#searchForm').on('submit', function (evt) {
  evt.preventDefault();
  const searchQuery = $('input[name=searchField]').val();
  getImage(searchQuery);
  $('input[name=searchField]').val('');
});

async function getImage(searchImg) {
  try {
    // Creates a GET request to Giphy public search API.
    const res = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=Q3V45h7sj6I2f9s2X6fYhSDe1oVZqwX8&q=${searchImg}&limit=25`
    );
    // Generates random Index to pick a random picture from search query.
    const randomImgIndx = Math.floor(Math.random() * res.data.data.length);

    // Generates image url from the randomIndex
    const imgURl = res.data.data[randomImgIndx].images.original.url;

    // Generates an image from the above imgURl
    const $selectedImg = $('<img>', { class: 'w-100' }).attr('src', imgURl);

    // Creates div for each image created
    const $selectedImgDiv = $('<div>', {
      class: 'col-md-4 col-12 mb-4'
    }).append($selectedImg);

    // Adds the new div to the DOM
    $('#imgDiv').append($selectedImgDiv).addClass('align-item-bottom');
  } catch (err) {
    console.log(err);
  }
}

$('#deleteAllImgs').on('click', function () {
  $('#imgDiv').empty();
});
