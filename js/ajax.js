
window.onload = function() {

    var btn = document.getElementById('btn_download_users');
    var loader = document.getElementById("loader");

    btn.addEventListener('click',function () {
        // AJAX Request with javascript
        var request = new XMLHttpRequest();
        // request.open('GET', 'https://next.json-generator.com/api/json/get/4ksYUJ29I');
        request.open('GET', 'php/users.php');
        // sprite while data are not yet retrieve
        loader.classList.add('active');

        //prepare retrieving data when request loaded
        request.onload = function () {
            //console.log(JSON.parse(request.responseText));
            //retrieve data with JSON 
            var data = JSON.parse(request.responseText);
            for ( i = 0; i < data.length; i++) {
                    var element = document.createElement('tr');
                    element.innerHTML += "<td>" + data[i]._id +     "</td>";
                    element.innerHTML += "<td>" + data[i].name +    "</td>";
                    element.innerHTML += "<td>" + data[i].age +     "</td>";
                    element.innerHTML += "<td>" + data[i].country + "</td>";
                    element.innerHTML += "<td>" + data[i].email +   "</td>";
                    document.getElementById('table').appendChild(element);      
            }
        }
        //prepare statuses infos and state change info of request
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) { 
                // readyState: 2 = request sent, 3 =  request processing,  4 = request finished )
                // status 200 sucess requests
                loader.classList.remove('active');
            }
        }
        //send the request
        request.send();
        
    });
}