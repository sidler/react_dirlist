<?php

/**
 * Created by PhpStorm.
 * User: sidler
 * Date: 07.02.17
 * Time: 14:29
 */
class Backend
{
    private $strBasedir = __DIR__."/../../../../";


    public function dispatch()
    {
        return $this->generateListing();
    }


    private function generateListing()
    {
        $arrFiles = scandir($this->strBasedir);
        $arrFiles = array_diff($arrFiles, [".", "..", ".DS_Store"]);

        uasort($arrFiles, function ($strFile1, $strFile2) {
            if (is_dir($this->strBasedir."/".$strFile1) && is_dir($this->strBasedir."/".$strFile2))
                return strcmp($strFile1, $strFile2);

            if (is_file($this->strBasedir."/".$strFile1) && is_file($this->strBasedir."/".$strFile2))
                return strcmp($strFile1, $strFile2);

            if (is_file($this->strBasedir."/".$strFile1) && is_dir($this->strBasedir."/".$strFile2))
                return 1;
            else
                return -1;

        });


        $arrReturn = [
            "content"    => ["folders" => [], "files" => []],
            "serverInfo" => ["phpversion" => phpversion(), "hostname" => $_SERVER['HTTP_HOST'], "webserver" => $_SERVER["SERVER_SOFTWARE"]],
        ];

        foreach ($arrFiles as $strOneFile) {
            if (@is_file($this->strBasedir."/".$strOneFile)) {
                $arrReturn["content"]["files"][] = ["name" => $strOneFile];
            } else {

                $arrFolder = [
                    "name"      => $strOneFile,
                    "backend"   => false,
                    "installer" => false,
                    "debug"     => false,
                    "branches"  => [],
                    "actions"   => [],
                ];

                if (@is_dir($this->strBasedir."/".$strOneFile."/core/module_system") || @is_file($this->strBasedir."/".$strOneFile."/core/module_system.phar")) {
                    $arrFolder["backend"] = true;
                }

                if (@is_file($this->strBasedir."/".$strOneFile."/installer.php")) {
                    $arrFolder["installer"] = true;
                }

                if (@is_file($this->strBasedir."/".$strOneFile."/debug.php")) {
                    $arrFolder["debug"] = true;
                }

                if (@is_file($this->strBasedir."/".$strOneFile."/.git/HEAD")) {
                    $arrFolder["branches"][] = ["name" => "", "branch" => str_replace("ref: refs/heads/", "", file_get_contents($this->strBasedir."/".$strOneFile."/.git/HEAD"))];
                }
                if (@is_file($this->strBasedir."/".$strOneFile."/.git/modules/core/HEAD")) {
                    $arrFolder["branches"][] = ["name" => "core", "branch" => str_replace("ref: refs/heads/", "", file_get_contents($this->strBasedir."/".$strOneFile."/.git/modules/core/HEAD"))];
                }
                if (@is_file($this->strBasedir."/".$strOneFile."/.git/modules/core_agp/HEAD")) {
                    $arrFolder["branches"][] = ["name" => "core_agp", "branch" => str_replace("ref: refs/heads/", "", file_get_contents($this->strBasedir."/".$strOneFile."/.git/modules/core_agp/HEAD"))];
                }

                if (@is_dir($this->strBasedir."/".$strOneFile."/project/temp/cache")) {
                    $arrFolder["actions"][] = ["type" => "delcache", "enabled" => true];
                }

                $arrReturn["content"]["folders"][] = $arrFolder;
            }

        }


        return json_encode($arrReturn);

    }


}

header("Content-Type: application/json; charset=utf-8");
$objBackend = new Backend();
echo $objBackend->dispatch();