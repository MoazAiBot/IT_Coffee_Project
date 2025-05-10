
function updatetotal() {
    var total = localStorage.getItem("cartTotal");
    if (total) {
        var totalelement = document.querySelector("h2");
        if (totalelement) {
            totalelement.innerHTML = "Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + total + "$<br />";
        }
    }
}

function pay_now() {
    alert("Payment Processed for $" + localStorage.getItem("cartTotal"));
    window.location.href = "Thank-You.html";
}

function validation() {
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let card = document.getElementById("card").value;
    let cvv = document.getElementById("cvv").value;


    if (fname.trim() === "" || lname.trim() === "") {
        alert("Firstname and Last name must be entered");
        return false;
    }

    if (isNaN(phone)) {
        alert("Please enter a valid phone number");
        return false;
    }

    if (phone.length !== 11) {
        alert("Please enter a valid phone number");
        return false;
    }

    if (card.length !== 16) {
        alert("Please enter a valid card number");
        return false;
    }

    if (cvv.length !== 3) {
        alert("Please enter a valid cvv");
        return false;
    }

    pay_now();
    return false;
}




window.onload = updatetotal;