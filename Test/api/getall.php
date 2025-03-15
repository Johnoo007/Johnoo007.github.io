<?php
   require_once('./db.php');

//_sarulbb
    try {   
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            $object = new stdClass();
            $object->Result = array();
            $stmt = $db->prepare('select * from sp_info order by id asc');
            $stmt_tip = $db->prepare('select * from sp_tip order by id asc');
            $stmt_exam = $db->prepare('select * from sp_exam order by id asc');
            $stmt_sarulbb = $db->prepare('select * from sp_sarulbb order by id asc');
            if($stmt_tip->execute()){
                $num = $stmt_tip->rowCount();
                if($num > 0){
                    while($row = $stmt_tip->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        array_push( $object->Result , $row);
                    }
                }
            }
            if($stmt_exam->execute()){
                $num = $stmt_exam->rowCount();
                if($num > 0){
                    while($row = $stmt_exam->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        array_push( $object->Result , $row);
                    }
                }
            }
            if($stmt->execute()){
                $num = $stmt->rowCount();
                if($num > 0){
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        array_push( $object->Result , $row);
                    }
                }
            }


            if($stmt_sarulbb->execute()){
                $num = $stmt_sarulbb->rowCount();
                if($num > 0){

                    
                    while($row = $stmt_sarulbb->fetch(PDO::FETCH_ASSOC)){
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