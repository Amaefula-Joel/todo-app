const body = $("body");

const checkboxLabel = $(".label-control span");
const checkboxPara = $(".item-wrap p");

const listItemContainer = $("#list-content");
const additemBtn = $("#add-item-btn");
const additemInput = $("#add-item-input");

const themeBtn = $("#theme-btn");

const itemsLeft = $("#item-count");

const filterBtn = $(".item-footer .list-filter button");

$(document).ready(function () {

    themeBtn.click(function () {

        if (body.attr("web-theme") === "light") {
            body.attr("web-theme", "dark");
            $("#theme-btn img").attr("src", "images/icon-sun.svg");
        } else {
            body.attr("web-theme", "light");
            $("#theme-btn img").attr("src", "images/icon-moon.svg");
        }

        bgChange();

        setTheme(body.attr("web-theme"));
    });

    /* function for addding new list item */
    additemBtn.click(function () {
        let inputText = additemInput.val();

        if (inputText === "") {
            alert("No Input Detected");
        } else {
            let itemWrap = $("<div></div>").addClass("item-wrap").attr("todo-status", "active");
            let checkboxLabel = $("<label></label>").addClass(
                "checkbox-wrapper label-control"
            );
            let checkbox = $("<input></input>").attr("type", "checkbox");
            let checkboxSpan = $("<span></span>")
                .addClass("checkmark")
                .attr("onclick", "checkToggle(this)");
            let itemPara = $("<p></p>")
                .text(inputText)
                .attr("onclick", "checkPara(this)");
            
            let cancelitemBtn = $("<button></button>").addClass("cancel-item").attr("onclick", "cancelListItem(this)");
            let cancelitemImg = $("<img></img>").attr({
                "src": "images/icon-cross.svg",
                "alt": "cancel list item"
            })

            checkboxLabel.append(checkbox, checkboxSpan);
            cancelitemBtn.append(cancelitemImg);

            itemWrap.append(checkboxLabel, itemPara, cancelitemBtn);

            listItemContainer.append(itemWrap);

            additemInput.val("");

            /* dynamic number of list items left */
            itemCount();
        }
    });

    /* submits the  */
    additemInput.on("keydown", function (e) {
        if (e.which === 13) {
            additemBtn.click();
        }
    });
});

function checkToggle(ele) {
    ele.parentElement.nextElementSibling.classList.toggle("checked");

    /* changes the tod status attribute */
    var todoStatus = ele.parentElement.parentElement.attributes["todo-status"];

    if (todoStatus.value === "active") {
        todoStatus.value = "completed";
    } else {
        todoStatus.value = "active";
    }

    $(".item-footer .list-filter button.active").click();    

    itemCount();
}

function checkPara(ele) {
    ele.previousElementSibling.children[1].click();
}

function bgChange() {
    let backgroundImage = $(".bg-image");

    if (body.attr("web-theme") === "light") {
        if (window.innerWidth >= 1050) {
            backgroundImage.attr("src", "images/bg-desktop-light.jpg");
        } else {
            backgroundImage.attr("src", "images/bg-mobile-light.jpg");
        }
    } else {
        if (window.innerWidth >= 1050) {
            backgroundImage.attr("src", "images/bg-desktop-dark.jpg");
        } else {
            backgroundImage.attr("src", "images/bg-mobile-dark.jpg");
        }
    }
}

/* stores a the new theme on theme button click */
function setTheme(theme) {
    localStorage.setItem("userTheme", theme);
}

/* sets the stored theme on load */
function getTheme() {
    if (!(localStorage.getItem("userTheme") === null)) {
        body.attr("web-theme", localStorage.getItem("userTheme"));

        /* changes the icon theme icon to match the stored theme */
        if (localStorage.getItem("userTheme") === "light") {
            $("#theme-btn img").attr("src", "images/icon-moon.svg");
        } else {
            $("#theme-btn img").attr("src", "images/icon-sun.svg");
        }
    } else {
        localStorage.setItem("userTheme", body.attr("web-theme"));
    }
}



function cancelListItem(ele) {
    ele.parentElement.remove();

    /* dynamic number of list items left */
    itemCount();
}

function clearCompleted() {
    let completed = document.querySelectorAll("#list-content .item-wrap[todo-status='completed']");

    for (let i = 0; i < completed.length; i++) {
        completed[i].remove();
    }
}

function itemFilter(ele, filter) {
    filterBtn.removeClass("active");
    ele.classList.add("active");

    let allItems = document.querySelectorAll("#list-content .item-wrap");
    for (let i = 0; i < allItems.length; i++) {
        allItems[i].style.display = "none";
    }

    let filteredItems = document.querySelectorAll("#list-content .item-wrap[todo-status='" + filter + "']");

    if (filter === "all") {
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].style.display = "flex";
        }
    } else {
        for (let i = 0; i < filteredItems.length; i++) {
            filteredItems[i].style.display = "flex";
        }
    }
}


function itemCount(){
    let activeItem = document.querySelectorAll("#list-content .item-wrap[todo-status='active']");

    itemsLeft.text(activeItem.length)
}