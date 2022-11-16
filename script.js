$(document).ready(function () {
    const checkboxLabel = $(".label-control span");
    const checkboxPara = $(".item-wrap p");


    checkboxLabel.click(function() {
        $(this).parent().next().toggleClass("checked");
    })

    checkboxPara.click(function() {
        $(this).prev().children("span").click();
    })


    
});