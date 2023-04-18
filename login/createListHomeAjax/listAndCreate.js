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