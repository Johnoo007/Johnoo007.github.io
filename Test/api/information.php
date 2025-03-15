<?php
    $db_host = 'localhost';
    $db_name = 'information';
    $db_user = 'root';
    $db_pass = '';
  
    header('Content-Type: application/json');

    try {   
        $db = new PDO("mysql:host=${db_host}; dbname=${db_name}", $db_user, $db_pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PEOException $e){
       echo $e->getMessage();
    }

?>