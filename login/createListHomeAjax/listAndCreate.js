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
                                    <a href="property-1.html"><img src="${data[i].pictures.src}"></a>
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
    let newHome = {
        name: name,
        type: arrayHomeType(),
        address: address,
        numberOfBedroom: numberOfBedroom,
        numberOfBathroom: numberOfBathroom,
        description: description,
        price: price,
        arrayImg: arrayPicture()
    };
    console.log(newHome)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newHome),
        url: "http://localhost:8080/homes",
        success() {
            showAllHome()
        }
    });
    event.preventDefault();

}

function arrayHomeType() {
        var input = document.getElementsByClassName("check")
        var value = [];
        for (let i = 0; i < input.length; i++) {
            value[i] = {
                "name": input[i].value
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
                <input type="file"  name="image" id="image">
                </div></div>`
    document.getElementById("inputPicture").innerHTML = context
    event.preventDefault()
}

showAllHome()