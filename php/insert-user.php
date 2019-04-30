<?php 

//no reports of errors 
error_reporting(0);

//indicates format to utf-8 and set the output as json file
header('Content-type: applicaton/json; charset=utf-8');

$name = $_POST['name'];
$age = $_POST['age'];
$country = $_POST['country'];
$email = $_POST['email'];

// //sanitize strings
// $name = trim($name);
// $name = filter_var($name, FILTER_SANITIZE_STRING);
// $email = trim($email);
// $email = filter_var($email, FILTER_SANITIZE_EMAIL);
// $country = trim($country);
// $country = filter_var($country, FILTER_SANITIZE_EMAIL);
// //validate email
// $email = filter_var($email, FILTER_VALIDATE_EMAIL);

function validateData ($name, $age, $country, $email){
    if ($name == ''){
        return false;
    // } elseif ($age == '' || !is_int($age) ) {
    } elseif ($age == '') {
        return false;
    } elseif ($country == '') {
        return false;
    } elseif ($email == '') {
        return false;
    }
    return true;
};

if (validateData($name, $age, $country, $email)) {
    //connection to bbdd user_ajax
    $conn = new mysqli('localhost', 'root','', 'users_ajax');
    $conn->set_charset("utf8");

    if ($conn->connect_errno) {
        $answer = ['error' => true];
    } else {
        $statement = $conn->prepare("INSERT INTO users(name, age, country, email) VALUES (?,?,?,?)");
        $statement->bind_param("siss", $name, $age, $country, $email);
        $statement->execute();

        if ($conn->affected_rows <= 0) {
            // $answer = ['error' => 'no row added'];
            $answer = ['error' => true];
        }
        // $answer = ['error' => false];;
        $answer = [];
    }
} else {
    $answer = ['error' => true];
}

echo json_encode($answer);

?>