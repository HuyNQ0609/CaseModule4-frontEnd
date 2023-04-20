// function editUserInformation() {
//     let url_string = window.location.href;
//     let url = new URL(url_string);
//     let id = url.searchParams.get("id");
//     let avatar = $('#avatarUser').val();
//     let fullName = $('#fullNameUser').val();
//     let oldPassword = $('#oldPassword').val();
//     let newPassword = $('#newPassword').val();
//     let confirmPassword = $('#confirmPassword').val();
//     let email = $('#emailUser').val();
//     let phone = document.getElementById("phoneNumberUser").value;
//     let address = document.getElementById("addressUser").value;
//
//     if (fullName === "" || newPassword === "" || email === "" || phone === "" || address === "") alert("Please fill out the information completely!")
//     else if (newPassword.length > 8 || newPassword.length < 6) alert("password have 6 to 8 letters")
//     else if (newPassword !== confirmPassword) alert("invalid password")
//     else if (confirmPassword === oldPassword) alert("The new password cannot be the same as the old password!")
//     else {
//         let newUser = {
//             "id": id,
//             "avatar": avatar,
//             "fullName": fullName,
//             "newPassword": newPassword,
//             "email": email,
//             "phone": phone,
//             "address": address
//         };
//         $.ajax({
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             type: "PUT",
//             data: JSON.stringify(newUser),
//             url: "http://localhost:8080/users/update/" + id,
//             success: function (foreseen) {
//                 alert("Update successful")
//             }
//         });
//     }
//     event.preventDefault();
// }

function viewUserInformation() {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    $.ajax({
        headers: {
            "Authorization": "Bearer" + token,
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/users/view",
        type: "GET",
        dataType: "json",
        success: function (result) {
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
viewUserInformation();

function showHomeDetailUser() {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)

    let url = window.location.search
    let urlParams = new URLSearchParams(url);
    let homeId = urlParams.get('id')

    $.ajax({
        headers: {
            "Authorization": "Bearer" + token
        },
        contentType: "application/json",
        method: "GET",
        url: "http://localhost:8080/homes/home/owner/" + homeId,
        success(data) {
            console.log(data)
            let image=""
            for (let i = 0; i < data.pictures.length; i++) {
                image+=`<li data-thumb="${data.pictures[i].src}">
                            <img src="${data.pictures[i].src}" alt=""/>
                        </li>`
            }
            if (image !== "") {
                document.getElementById("image-gallery").innerHTML = image
            }
            let homeName = data.name;
            document.getElementById("houseName-1").innerHTML = homeName
            let priceHouse = data.price + " VND";
            document.getElementById("price-1").innerHTML = priceHouse
            let bedroom = data.numberOfBedroom;
            document.getElementById("bedroom-1").innerHTML = bedroom
            let bathroom = data.numberOfBathroom;
            document.getElementById("bathroom-1").innerHTML = bathroom
            let descriptionHouse = data.description;
            document.getElementById("description-1").innerHTML = descriptionHouse
            let ownerName = data["owner"].fullName;
            document.getElementById("ownerName").innerHTML = ownerName
            let ownerAddress = data["owner"].address;
            document.getElementById("ownerAddress").innerHTML = ownerAddress
            let ownerEmail = data["owner"].email;
            document.getElementById("ownerEmail").innerHTML = ownerEmail
            let ownerPhone = data["owner"].phone;
            document.getElementById("ownerPhone").innerHTML = ownerPhone
        }
    })
}
showHomeDetailUser()

function showTopHomeRental() {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    $.ajax({
        headers: {
            "Authorization": "Bearer" + token,
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/homes/showTopHome",
        type: "GET",
        dataType: "json",
        success: function (result) {
            let content = "";

            for (let i = 0; i < result.length; i++) {
                content += `<li>
                                    <div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0">
                                        <a href="../userManager/showHomeDetailUser.html?id=${result[i].id}">
                                        <img src="${result[i].pictures[0].src}" alt="..."></a>
                                    </div>
                                    <div class="col-md-8 col-sm-8 col-xs-8 blg-entry">
                                        <h6><a href="single.html">${result[i].name}</a></h6>
                                        <span class="property-price">${result[i].price}</span>
                                    </div>
                            </li>`
            }
            document.getElementById('topHome').innerHTML = content
        },
        error: function (xhr, status, error) {
            console.error("Error: " + error);
        }
    });
}
showTopHomeRental();