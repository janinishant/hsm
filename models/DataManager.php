<?php

namespace models;

/** Include path **/
set_include_path(get_include_path() . PATH_SEPARATOR . '../library/');

/** PHPExcel_IOFactory */
include 'PHPExcel/IOFactory.php';
require_once 'DataManager.php';

class DataManager {

    public function getAllInJson()
    {
        echo (json_encode($this->getAll()));
    }

    /**
     * Get all rows of the excel sheet using PHPExcel library
     */
    public function getAll()
    {

        $inputFileType = 'Excel2007';
        $inputFileName = './data/01simple.xlsx';

        $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
        $objReader->setReadDataOnly(true);
        $objPHPExcel = $objReader->load($inputFileName);

        $sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
        return ($this->partitionData($sheetData));
    }


    /**
     * Excel data contains questions and their related options.
     * The function will partition the excel data into questions and options for each question
     */
    public function partitionData($excelData)
    {
        if(!is_array($excelData)) {
            exit("Invalid data passed");
        }

        //Every odd key will have question
        //Every even key will have a option/suggestion/answer for the question
        $formattedExcelData = $this->convertToKeyValue($excelData);
        return $this->groupOptions($formattedExcelData, array());
    }


    /**
     * Data that we get from PHPExcel is of format A => job type, B => Electrical.
     * This function eliminates the redundant keys A and key and converts data into key value type
     * job type => electrical
     * @param array $excelData excel data in redundant key value pair format
     * @return array key value formatted excel data
     */
    public function convertToKeyValue($excelData)
    {
        $data = array();
        foreach($excelData as $index => $valueArray) {
            $data[$index] = array();
            foreach($valueArray as $key => $val) {
                if(!empty($key) && !empty($val)) {
                    $numericKey = ord($key);
                    if($numericKey % 2) {
                        $data[$index][$val] = '';
                    }
                    else {
                        $keySelected = $valueArray[chr($numericKey -1)];
                        $data[$index][$keySelected] = $val;
                    }
                }
            }
        }
        return $data;
    }

    /**
     * @param $formattedExcelData
     * @param array $result
     */
    public function groupOptions($formattedExcelData, $result = array())
    {
        //2 for loops 1 to iterate over each row of the excel sheet
        //second loop to iterate over each field of the row.
        foreach($formattedExcelData as $index => $row) {
            $keys = array();

            //iterate over each field of the row
            foreach($row as $key => $value) {

                if($this->arrayKeyExistsAtDepth($keys,$key, $result)) {
                    $keys[] = $key;
                    //If array push value into the array
                    if($this->isArrayAtDepth($keys, $result)) {

                        //check if key for value already exists
                        if($this->arrayKeyExistsAtDepth($keys, $value, $result)){
                            $keys[] = $value;
                            continue;
                        }
                        else {
                            array_push($keys,$value);
                            $this->createArrayAtDepth($keys,$result);
                        }
                    }
                }
                else {
                    if($key == 'action') {
                        array_push($keys, $key);
                        $this->createArrayAtDepth($keys,$result, $value);

                    }
                    else {
                        array_push($keys, $key);
                        $this->createArrayAtDepth($keys,$result);

                        array_push($keys,$value);
                        $this->createArrayAtDepth($keys,$result);

                    }
                }
            }
        }
        return ($result);
    }


    /**
     * Modified array_key_exists of PHP to search the key at a depth of a array given the keys
     * @param array $keys Given keys to navigate to the depth of the array
     * @param string $searchKey key to search at a given depth
     * @param array $searchArray search array
     * @return bool Return true fi key exists else returns false
     */
    public function arrayKeyExistsAtDepth($keys, $searchKey, $searchArray)
    {
        //navigate to the depth
        foreach($keys as $key) {
            if(array_key_exists($key, $searchArray)) {
                $searchArray = $searchArray[$key];
            }
        }
        //now search the key at the given length
        if(is_array($searchArray)) {
            return array_key_exists($searchKey, $searchArray);
        }
        //return false if its not a array
        return false;

    }

    /**
     * Modified the is_array PHP function to determine if array exists at a depth
     * @param array $keys Given keys to navigate to the depth of the array
     * @param string $searchArray key to search at a given depth
     * @return bool Return true fi key exists else returns false
     */
    public function isArrayAtDepth($keys, $searchArray)
    {
        //navigate to the depth
        foreach($keys as $key) {
            $searchArray = $searchArray[$key];
        }
        //now search the key at the given length
        if(is_array($searchArray)) {
            return true;
        }
        //return false if its not a array
        return false;
    }

    /**
     * Create a blank array at given depth
     * @param array $path Given keys to navigate to the depth of the array
     * @param array $searchArray key to search at a given depth
     * @param string $value  Create an array for the following keys     *
     */
    function createArrayAtDepth($path, &$searchArray, $value = "") {
        if(is_array($path)) {
            $key = array_pop($path);
        }

        foreach($path as $k) {
            if(!isset($searchArray[$k]))
                $searchArray[$k] = array();
            $searchArray = &$searchArray[$k];
        }
        if(empty($value)) {
            $searchArray[$key ? $key : count($searchArray)] = array();

        }
        else{
            $searchArray[$key ? $key : count($searchArray)] = $value;
        }
    }
}



$uri = $_SERVER['REQUEST_URI'];
$functionName = array_pop(explode('/',$uri));
$dataManager = new DataManager();


if(method_exists($dataManager, $functionName)) {
    $dataManager->$functionName();
}
