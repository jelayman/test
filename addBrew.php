<?php
session_start();
require_once 'db.php';
require_once 'brewModel.php';
require_once 'locationModel.php';

$brewModel = new brewModel(MY_DSN, MY_USER,MY_PASS);
$locModel = new locationModel(MY_DSN, MY_USER,MY_PASS);

if($_SESSION['logged_in'] == true){

    $name = $_GET['nameBrew'];
    $brewery = $_GET['breweryBrew'];
    $style = $_GET['styleBrew'];
    $locID = $_GET['locID'];
    $userID = $_SESSION['id'];
    $brewResults = $brewModel->getBrewByName($name);

    if($brewResults){

        $return = array('exists'=>'true');

    }else{

        $addBrew = $brewModel->addBrew($name, $brewery, $style, $userID);

        if($addBrew){

            $selectBrew = $brewModel->getBrewByName($name);

            if($selectBrew){

                $brewID = $selectBrew[0]['id'];

                $addToLocation = $brewModel->addBrewToLocation($brewID, $locID );

                if($addToLocation){

                    $return = array('added'=>'true');

                }
            }
        }
    }

}else{
    $return = array('error'=>'true');
}

echo json_encode($return);
 
