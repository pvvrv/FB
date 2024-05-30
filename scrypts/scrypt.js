document.querySelector('#contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
});



document.querySelector('#quality-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
});
