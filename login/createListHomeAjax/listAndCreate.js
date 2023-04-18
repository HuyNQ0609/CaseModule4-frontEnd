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
                                        <img src="assets/img/icon/bed.png">${data[i].numberOfBedroom}
                                        <img src="assets/img/icon/shawer.png">${data[i].numberOfBathroom}
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
    let types = $('#types').val()
    let address = $('#address').val()
    let numberOfBathroom = $('#numberOfBathroom').val()
    let numberOfBedroom = $('#numberOfBedroom').val()
    let description = arrayPicture().values()
    const arrayImg = document.getElementsByName('image');
    console.log(arrayImg);

}

function arrayPicture() {
    var input = document.getElementsByName('image');
    var value = new Array();
    for (let i = 0; i < input.length; i++) {
        value[i] = input[i].value;
    }
    return value;
}


function inputPicture() {
    let context = document.getElementById("inputPicture").innerHTML
    context += `<div class="form-group">
                                            <label for="property-images">Chose Images :</label>
                                            <input class="form-control" type="file" id="property-images" multiple>
                                        </div>`
    document.getElementById("inputPicture").innerHTML = context
    event.preventDefault()
}

showAllHome()