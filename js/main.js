window.onload = function() {

    var btnDownload = document.getElementById('btn_download_users'),
        erro_box = document.getElementById('error_box'),
        loaderUp = document.getElementById("loader"),
        table = document.getElementById('table');

    var user_name, 
        user_age, 
        user_country,
        user_email;

    function downloadUsers() {
        //clean old rows if they exists and show only the header row of the table
        table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Age</th><th>Country</th><th>Mail</th></tr>";
        // AJAX Request with javascript
        var request = new XMLHttpRequest();
        request.open('GET', 'php/read-data.php');
        // sprite while data are not yet retrieve
        loader.classList.add('active');

        //prepare retrieving data when request loaded
        request.onload = function () {
            console.log(JSON.parse(request.responseText));
            //retrieve data with JSON 
            var data = JSON.parse(request.responseText);

            // if (data['error'] == true) {
            if (data.error) {
                erro_box.classList.add('active');
            } else {
                loader.classList.remove('active');
                for ( i = 0; i < data.length; i++) {
                    var element = document.createElement('tr');
                    element.innerHTML += "<td>" + data[i]._id +     "</td>";
                    element.innerHTML += "<td>" + data[i].name +    "</td>";
                    element.innerHTML += "<td>" + data[i].age +     "</td>";
                    element.innerHTML += "<td>" + data[i].country + "</td>";
                    element.innerHTML += "<td>" + data[i].email +   "</td>";
                    table.appendChild(element);      
                }    
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
    }
    
    btnDownload.addEventListener('click',function () {
        downloadUsers();

    });
}  