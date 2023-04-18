function editUserInformation() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    let avatar = $('#avatarUser').val();
    let fullName = $('#fullNameUser').val();
    let oldPassword = $('#oldPassword').val();
    let newPassword = $('#newPassword').val();
    let confirmPassword = $('#confirmPassword').val();
    let email = $('#emailUser').val();
    let phone = document.getElementById("phoneNumberUser").value;
    let address = document.getElementById("addressUser").value;

    if (fullName === "" || newPassword === "" || email === "" || phone === "" || address === "") alert("Please fill out the information completely!")
    else if (newPassword.length > 8 || newPassword.length < 6) alert("password have 6 to 8 letters")
    else if (newPassword !== confirmPassword) alert("invalid password")
    else if (confirmPassword === oldPassword) alert("The new password cannot be the same as the old password!")
    else {
        let newUser = {
            "id": id,
            "avatar": avatar,
            "fullName": fullName,
            "newPassword": newPassword,
            "email": email,
            "phone": phone,
            "address": address
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            data: JSON.stringify(newUser),
            url: "http://localhost:8080/users/update/" + id,
            success: function (foreseen) {
                viewUserInformation()
            }
        });
    }
    event.preventDefault();
}

function viewUserInformation() {
    // Lấy ID sản phẩm từ URL
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    // Gửi yêu cầu AJAX để lấy thông tin chi tiết sản phẩm
    $.ajax({
        url: "http://localhost:8080/users/view/" + id,
        type: "GET",
        dataType: "json",
        success: function (result) {
            // Hiển thị thông tin chi tiết sản phẩm trên trang HTML
            $("#fullName").text(result.fullName);
            $("#username").text(result.username);
            $("#password").text(result.password);
            $("#email").text(result.email);
            $("#phoneNumber").text(result.phone);
            $("#address").text(result.address);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + error);
        }
    });
}