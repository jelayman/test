<?php

class brewModel {

    private $db = NULL;

    function __construct($dsn, $user, $pass){

        $this->db = new PDO($dsn, $user, $pass);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    function getBrewByName($name){

        $name = "%".$name."%";

        $stmt = $this->db->prepare("

            SELECT id, name, breweryName, style
            FROM brews
            WHERE (name LIKE :name) OR (style LIKE :name)
            ;
        ");
        try{
            if($stmt->execute(array(
                ':name' => $name

            ))){
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if(count($rows) > 0){
                    return $rows;
                }else{
                    return false;
                }
            }
        }catch(PDOException $err){

            return false;
        }
        return false;
    }

    function getLocationsByBrewId($name){

        $name = "%".$name."%";

        $stmt = $this->db->prepare("

            SELECT id, name, breweryName, style
            FROM brews
            WHERE (name LIKE :name)
                OR (style LIKE :name)
                OR (breweryName LIKE :name)
            ;
        ");
        try{
            if($stmt->execute(array(
                ':name' => $name

            ))){
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if(count($rows) > 0){
                    return $rows;
                }else{
                    return false;
                }
            }
        }catch(PDOException $err){

            return false;
        }
        return false;
    }

    function addBrew($name, $breweryName, $style, $userID){

        $added3 = false;

        $stmt = $this->db->prepare("

            INSERT INTO brews (name, breweryName, style, userID)
            VALUES ( :name, :breweryName, :style, :userID )
            ;
        ");
        try{
            if($stmt->execute(array(
                ':name' => $name,
                ':breweryName' => $breweryName,
                ':style' => $style,
                ':userID' => $userID

            ))){


               	$added3 = true;

            }
        }catch(PDOException $err){

            return false;
        }
        return $added3;
    }

    function addBrewToLocation($brewID, $locationID){

        $added2 = false;

        $stmt = $this->db->prepare("

            INSERT INTO brewsAtLocations (brewID, LocationID)
            VALUES ( :brewID, :LocationID )
            ;
        ");
        try{
            if($stmt->execute(array(
                ':brewID' => $brewID,
                ':LocationID' => $locationID

            ))){

                $added2 = true;

            }
        }catch(PDOException $err){

            return false;
        }
        return $added2;
    }

}
