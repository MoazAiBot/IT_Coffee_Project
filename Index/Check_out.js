function pay_now() {
    window.alert("Your details are saved successfully");
    window.location.href = "Thank-You.html";
}

function name_valid() {
    let val1 = document.getElementById("firstname").value;
    let val2 = document.getElementById("lastname").value;
    if (val1.trim() === "" || val2.trim() === "") {
        alert("Please enter your First name and last name correctly");
        return false;
    }

    pay_now();
    return false;
}