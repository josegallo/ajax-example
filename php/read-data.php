<?php
//no reports of errors 
error_reporting(0);

//indicates format to utf-8 and set the output as json file
header('Content-type: applicaton/json; charset=utf-8');

//connection to bbdd user_ajax
$conn = new mysqli('localhost', 'root','', 'users_ajax');
if ($conn->connect_errno) {
    $answer = ['error' => true];
} else {
    //retrieve all the users
    $conn->set_charset("utf8");
    $sql = "SELECT * FROM users"; 
    $result = $conn->query($sql);
    if ($result->num_rows) {
        //create emtpy array 
        $answer = [];
        //fetch assocc retrieves 1 array per row (user)
        while ($row = $result->fetch_assoc()) {
            $user = [
                '_id'       => $row['ID'],
                'name'      => $row['name'],
                'age'       => $row['age'],
                'country'   => $row['country'],
                'email'     => $row['email']
            ];
            //put user array into answer array
            array_push($answer,$user);
        }
    }
}
//convert array into json 
echo json_encode($answer);

?>