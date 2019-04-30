window.onload = function() {
    // console.log('onlad');
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
            //also can be retrieve data from API
            // request.open('GET', 'https://next.json-generator.com/api/json/get/4ksYUJ29I');
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
    
    function uploadUsers(e) {
        //submit without reload the page
        e.preventDefault();
        //AJAX
        var request = new XMLHttpRequest();
        request.open('POST', 'php/insert-user.php');

        //cleanning variables 
        user_name = form.name.value.trim();
        user_age = parseInt(form.age.value.trim());
        user_country = form.country.value.trim();
        user_email = form.email.value.trim();

        //if information of the form is correct
        if (formValid()) {
            
            //remove error
            error_box.classList.remove('active');
            //create variable for php parameters = name=jose&age=7&country=spain&email=jose@gmail.com
            var parameters = 'name=' + user_name + '&age=' + user_age + '&country=' + user_country + '&email=' + user_email;
            console.log(parameters);
            //set header of request
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            //animeate spiner sprite
            loaderUp.classList.add('active');

            //when the request be loaded
            request.onload = function () {
                //download and show all the users
                downloadUsers();
                //clean form
                form.name.value = '';
                form.age.value = '';
                form.country.value = '';
                form.email.value = '';
            }
            
            //prepare statuses infos and state change info of request
            request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) { 
                // readyState: 2 = request sent, 3 =  request processing,  4 = request finished )
                // status 200 sucess requests
                // if everything ok sprite of spinner desappears
                loader.classList.remove('active');
                }
            }
            //send request
            request.send(parameters);

        } else { //information of the form is incorrect
            //show error
            error_box.classList.add('active');
            erro_box.innerHTML = "Please complete correctly the form";
        }
    }

    btnDownload.addEventListener('click',function () {
        // console.log('click');
        downloadUsers();
    });

    form.addEventListener ('submit',function (e) {
        // console.log('submit');
        uploadUsers(e); 
        //e = event, avoid reload of page, only with submit
    });

    function formValid() {
        if (user_name == ''){
            return false;
        } else if (isNaN(user_age)) { //if user age is a number
            return false;
        } else if (user_country == '') {
            return false;
        } else if (user_email == '') {
            return false;
        }
        return true;
    };
}  