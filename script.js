const checkboxLabel = $(".label-control span");
const checkboxPara = $(".item-wrap p");

const listItemContainer = $("#list-content");
const additemBtn = $("#add-item-btn");
const additemInput = $("#add-item-input");

const body = $("body");

const themeBtn = $("#theme-btn");

$(document).ready(function () {

    themeBtn.click(function () {

        if (body.attr("web-theme") === "light") {
            body.attr("web-theme", "dark");
            $("#theme-btn img").attr("src", "images/icon-moon.svg");
        } else {
            body.attr("web-theme", "light");
            $("#theme-btn img").attr("src", "images/icon-sun.svg");
        }

        bgChange();

        setTheme(body.attr("web-theme"));

        console.log("yes");
    });

    /* function for addding new list item */
    additemBtn.click(function () {
        let inputText = additemInput.val();

        if (inputText === "") {
            alert("no text inputted");
        } else {
            let itemWrap = $("<div></div>").addClass("item-wrap");
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

            checkboxLabel.append(checkbox, checkboxSpan);

            itemWrap.append(checkboxLabel, itemPara);

            listItemContainer.append(itemWrap);

            additemInput.val("");
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
}

function checkPara(ele) {
    ele.previousElementSibling.children[1].click();
}

function bgChange() {
    let backgroundImage = $(".bg-image");

    if (body.attr("web-theme") === "light") {
        if (window.outerWidth >= 1050) {
            backgroundImage.attr("src", "images/bg-desktop-light.jpg");
        } else {
            backgroundImage.attr("src", "images/bg-mobile-light.jpg");
        }
    } else {
        if (window.outerWidth >= 1050) {
            backgroundImage.attr("src", "images/bg-desktop-dark.jpg");
        } else {
            backgroundImage.attr("src", "images/bg-mobile-dark.jpg");
        }
    }
}

/* stores a the new theme on theme button click */
function setTheme(theme){
    localStorage.setItem("userTheme", theme);
}

/* sets the stored theme on load */
function getTheme() { 
    if ( !(localStorage.getItem("userTheme") === null)) {
        body.attr("web-theme", localStorage.getItem("userTheme"));

        /* changes the icon theme icon to match the stored theme */
        if (localStorage.getItem("userTheme") === "light") {
            $("#theme-btn img").attr("src", "images/icon-sun.svg");
        } else {
            $("#theme-btn img").attr("src", "images/icon-moon.svg");
        }
    } else{
        localStorage.setItem("userTheme", body.attr("web-theme")); 
    }
}