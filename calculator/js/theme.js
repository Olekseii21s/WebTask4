const themeSelect = document.getElementById('themeSelect');
const colorPicker = document.getElementById('colorPicker');

themeSelect.addEventListener('change', function() {
    const selectedTheme = themeSelect.value;
    changeTheme(selectedTheme);
});

colorPicker.addEventListener('change', function() {
    const selectedColor = colorPicker.value;
    changeColor(selectedColor);
});

function changeTheme(theme) {
    const body = document.body;
    const container = document.querySelector('.container');
    body.style.transition = 'background-color 0.5s, color 0.5s';
    container.style.transition = 'background-color 0.5s, color 0.5s';
    if (theme === 'light') {
        body.style.backgroundColor = '#f0f0f0';
        body.style.color = '#000';
        container.style.backgroundColor = '#f0f0f0';
        container.style.color = '#000';
    } else if (theme === 'dark') {
        body.style.backgroundColor = '#333';
        body.style.color = '#fff';
        container.style.backgroundColor = '#333';
        container.style.color = '#fff';
    } else {
        body.style.backgroundColor = 'initial';
        body.style.color = 'initial';
        container.style.backgroundColor = 'initial';
        container.style.color = 'initial';
    }
}

function changeColor(color) {
    const body = document.body;
    body.style.transition = 'background-color 0.5s';
    body.style.backgroundColor = color;
}
