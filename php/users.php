<?php 

//format to utf-8 and set the output as json file
header('Content-type: applicaton/json; charset=utf-8');

//associative array
$answer = [
    [
        '_id'  => 'a56s7df8igsdhf7',
        'name' => 'Jose',
        'age'  => 45,
        'country' => 'Spain',
        'email' => 'jose@gmail.com' 
    ],
    [
        '_id'  => 'a56s7df8igashf7',
        'name' => 'Felix',
        'age'  => 50,
        'country' => 'Spain',
        'email' => 'alex@gmail.com'
    ]
];

//convert array into json 
echo json_encode($answer);

// echo '[
//     {   "name":"Jose", 
//         "age": "45",
//         "_id": "asfahsdfoas¡df" 
//                         } ,
//     {   "name": "Jimena",
//         "age": "12",
//         "_id": "40rwqpafsgasdf"
//                         }
//     ]';
?>
