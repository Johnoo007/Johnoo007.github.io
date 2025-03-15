<?php
   require_once('./information.php');

    try {   
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            $object = new stdClass();
            $object->Result = array();
            $stmt = $db->prepare('select * from code order by id asc');

            if($stmt->execute()){
                $num = $stmt->rowCount();
                if($num > 0){

                    
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        array_push( $object->Result , $row);
                    }
                    $object->Respcode = 200;
                    $object->RespMessage = "Yae";
                    http_response_code(200);
                }
                else{
                    $object->Respcode = 400;
                    $object->log = 0;
                    $object->RespMessage = "Not found";
                    http_response_code(400);
                }
                echo json_encode($object);
            }
            else {
                $object->Respcode = 500;
                $object->log = 1;
                $object->RespMessage = "Bad Sql";
                http_response_code(400);
            }

        }
        else {
            http_response_code(405);
        }
    }
    catch(PDOException $e){
       echo $e->getMessage();
    }

?>