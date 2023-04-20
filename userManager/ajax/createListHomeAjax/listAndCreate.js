function showAllHome() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/homes",
        dataType: "json",
        success(data) {
            let context = ""
            for (let i = 0; i < data.length; i++) {
                context += `<div class="col-sm-6 col-md-4 p0">
                            <div class="box-two proerty-item">
                            <div class="item-thumb">
                                    <a href="property-1.html"><img src="${data[i].pictures.src}"><button onclick="showHomeDetail(${data[i].id})"></button></a>
                                </div>

                                <div class="item-entry overflow">
                                    <h5><a href="property-1.html"><input type="text" value="${data[i].name}"></a></h5>
                                    <div class="dot-hr"></div>
                                    <span class="pull-left"><b> Area :</b> 120m </span>
                                    <span class="proerty-price pull-right"><input type="text" value="${data[i].price}"></span>
                                    <p><input type="text" value="${data[i].description}"></p>
                                    <div class="property-icon">
                                        <img src="assets/img/icon/bed.png" alt="">${data[i].numberOfBedroom}
                                        <img src="assets/img/icon/shawer.png" alt="">${data[i].numberOfBathroom}
                                    </div>
                                </div>
                                </div>
                        </div>`
            }
            document.getElementById("display").innerHTML = context
        }
    })
}


function addNewHome() {
    let name = $('#name').val()
    let types = arrayHomeType()
    let address = $('#address').val()
    let numberOfBathroom = $('#bath').val()
    let numberOfBedroom = $('#bedr').val()
    let description = $('#description').val()
    let price = $('#price').val()
    let arrayImg = arrayPicture();
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    let newHome = {
        name: name,
        types: arrayHomeType(),
        address: address,
        numberOfBedroom: numberOfBedroom,
        numberOfBathroom: numberOfBathroom,
        description: description,
        price: price,
        pictures: arrayImg
    };
    console.log(newHome)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + token
        },
        type: "POST",
        data: JSON.stringify(newHome),
        url: "http://localhost:8080/homes/create",
        success() {
            window.open("listHouseOwner.html")
        }
    });
    event.preventDefault();

}

function arrayHomeType() {
        var input = document.getElementsByClassName("icheckbox_square-yellow checked")
        var value = [];
        for (let i = 0; i < input.length; i++) {
            value[i] = {
                "name": input[i].firstChild.attributes.value.value
            }
        }
    return value;
}

function arrayPicture() {
    var input = document.getElementsByName('image');
    var value = [];
    for (let i = 0; i < input.length; i++) {
        value[i] = {
            "src": input[i].value
        }

    }
    return value;
}


function inputPicture() {
    let context = document.getElementById("inputPicture").innerHTML
    context += ` <div id="inputPicture">
<div class="form-group">
                <label>Chose Images :</label>
                <input type="text"  name="image" id="image">
                </div></div>`
    document.getElementById("inputPicture").innerHTML = context
    event.preventDefault()
}

showAllHome()