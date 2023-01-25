function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}


function moveButton() {
    let button = document.getElementsByClassName("button-container")[0];

    var e = window.event;

    var mouse_x = e.clientX;
    var mouse_y = e.clientY;

    let button_center_x = button.offsetLeft + button.offsetWidth / 2;
    let button_center_y = button.offsetTop + button.offsetHeight / 2;

    button.style.left = button.offsetLeft - (mouse_x - button_center_x) + "px";
    button.style.top = button.offsetTop - (mouse_y - button_center_y) + "px";
    console.log("x: " + (mouse_x - button_center_x));
    console.log("y: " + (mouse_y - button_center_y));
    
    if (!isInViewport(button)) {
        button.style.top = "50%";
        button.style.left = "50%";
    }

}

function clickButton() {
    let button = document.getElementsByClassName("button-container")[0];

    button.style.top = "50%";
    button.style.left = "50%";
}
