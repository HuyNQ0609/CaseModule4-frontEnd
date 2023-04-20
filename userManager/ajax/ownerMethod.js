function showHomeDetail() {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)

    let url = window.location.search
    let urlParams = new URLSearchParams(url);
    let homeid = urlParams.get('id')

    $.ajax({
        headers: {
            "Authorization": "Bearer" + token
        },
        contentType: "application/json",
        method: "GET",
        url: "http://localhost:8080/homes/home/owner/" + homeid,
        success(data) {
            console.log(data)
            let image=""
            for (let i = 0; i < data.pictures.length; i++) {
                image+=`<li data-thumb="${data.pictures[i].src}">
                            <img src="${data.pictures[i].src}"/>
                        </li>`
            }
            if (image !== "") {
                document.getElementById("image-gallery").innerHTML=image
            }
            let homenamehtml=data.name;
            document.getElementById("homename").innerHTML=homenamehtml
            let price=data.price+" VND"
            document.getElementById("price").innerHTML=price
            let numberofbedroom=data.numberOfBedroom
            document.getElementById("numberofBedroom").innerHTML=numberofbedroom
            let numberofbathroom=data.numberOfBathroom
            document.getElementById("numberOfBathroom").innerHTML=numberofbathroom
            let homeDescription=data.description
            document.getElementById("homeDescription").innerHTML=homeDescription
        }
    })
}
showHomeDetail()