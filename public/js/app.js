const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = '';
    messageTwo.textContent =  'Loading'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error;
                // console.log(data.error);
            } else {
                messageTwo.textContent = data.location;
                messageOne.textContent = data.forecast;
                // console.log(location);
                // console.log(data);
            }
        });
    });
});