$(document).ready(function () {
    const checkboxLabel = $(".label-control span");
    const checkboxPara = $(".item-wrap p");

    const listItemContainer = $("#list-content");
    const additemBtn = $("#add-item-btn");
    const additemInput = $("#add-item-input");

    /* function for addding new list item */
    additemBtn.click(function() {
        let inputText = additemInput.val();

        if (inputText === "") {
            alert("no text inputted");
        } else {
            let itemWrap = $("<div></div>").addClass("item-wrap");
            let checkboxLabel = $("<label></label>").addClass("checkbox-wrapper label-control");
            let checkbox = $("<input></input>").attr("type", "checkbox");
            let checkboxSpan = $("<span></span>").addClass("checkmark").attr("onclick", "checkToggle(this)");
            let itemPara = $("<p></p>").text(inputText).attr("onclick", "checkPara(this)");

            checkboxLabel.append(checkbox, checkboxSpan);

            itemWrap.append(checkboxLabel, itemPara);

            listItemContainer.append(itemWrap);

            additemInput.val("");
        }
    })

    additemInput.on("keydown", function(e){
        if(e.which === 13){
            additemBtn.click();
        }
    });

    
});

function checkToggle(ele) {
    ele.parentElement.nextElementSibling.classList.toggle("checked");
}

function checkPara(ele){
    ele.previousElementSibling.children[1].click();
}
