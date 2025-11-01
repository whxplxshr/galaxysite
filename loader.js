document.addEventListener("DOMContentLoaded", function() {
    // Функция для загрузки фрагментов HTML
    const loadHTML = (url, elementId) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                document.getElementById(elementId).innerHTML = `<p style="color:red;">Не удалось загрузить ${elementId}. Проверьте путь к файлу.</p>`;
            });
    };

    // Загружаем header и footer
    // Убедись, что пути 'header.html' и 'footer.html' правильные относительно файла задания
    loadHTML("H:/web prog/galaxy site/header.html", 'header-container');
    loadHTML('H:/web prog/galaxy site/footer.html', 'footer-container');
});
