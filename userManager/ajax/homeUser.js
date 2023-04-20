function showListHouseOfFormUser() {
    let add = document.getElementById("addressSearch").value
    let minprice = document.getElementById("minPrice").value
    let maxprice = document.getElementById("maxPrice").value
    let minbed = document.getElementById("minbed").value
    let maxbed = document.getElementById("maxbed").value
    let minbath = document.getElementById("minbath").value
    let maxbath = document.getElementById("maxbath").value
    let mindate = document.getElementById("mindate").value
    let maxdate = document.getElementById("maxdate").value
    let form = {
        minNumberOfBathroom: minbath,
        maxNumberOfBathroom: maxbath,
        minNumberOfBedroom: minbed,
        maxNumberOfBedroom: maxbed,
        address: add,
        priceMin: minprice,
        priceMax: maxprice,
        minDate: mindate,
        maxDate: maxdate
    }
    $.ajax({
        // type: get, post, put or delete
        type: "GET",
        // url: link
        url: "http://localhost:8080/homes/search",
        data:form,
        // processing when calling data successfully
        success: function (foreseen) {
            console.log(foreseen);
            // redraw the board
            let content = ""
            for (let i = 0; i < foreseen.length; i++) {
                console.log(foreseen[i].pictures[0])
                content += `<div class="col-sm-6 col-md-4 p0">
                                <div class="box-two proerty-item">
                                    <div class="item-thumb">`

                if (foreseen[i].pictures.length > 0)
                    content += `<a href="/ownerManager/homeDetail.html?id=${foreseen[i].id}"><img src="${foreseen[i].pictures[0].src}"></a>`
                else content += `<a href="/ownerManager/homeDetail.html?id=${foreseen[i].id}"><img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Queen_Boudica_by_John_Opie.jpg"></a>`

                content += `</div>
                                    <div class="item-entry overflow">
                                        <h5><a href="/ownerManager/homeDetail.html?id=${foreseen[i].id}">${foreseen[i].name}</a></h5>
                                        <div class="dot-hr"></div>`
                if (foreseen[i].types.length > 0)
                    content += `
                                        <span class="pull-left"><b>Home type: </b>${foreseen[i].types[0].name}</span>
                                        `

                content += `
                                        <span class="proerty-price pull-right">${foreseen[i].price} VND</span>
                                        <p style="display: none;">${foreseen[i].description}</p>
                                        <div class="property-icon">
                                            <img src="assets/img/icon/bed.png" alt="">${foreseen[i].numberOfBathroom}|
                                            <img src="assets/img/icon/shawer.png" alt="">${foreseen[i].numberOfBedroom}
                                        </div>
                                    </div>
                                </div>
                            </div>`
            }
            document.getElementById('list-type').innerHTML = content;
        }
    });
    event.preventDefault();
}

showListHouseOfFormUser();
