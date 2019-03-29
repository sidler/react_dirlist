<?php

/**
 * Created by PhpStorm.
 * User: sidler
 * Date: 07.02.17
 * Time: 14:29
 */
class Backend
{
//    private $strBasedir = __DIR__."/../../../../";
    private $strBasedir = __DIR__."/../";


    public function dispatch()
    {
        if (!empty($_GET["clearcache"])) {
            $this->clearCacheDir(($_GET["clearcache"]));
        }
        return $this->generateListing();
    }


    private function clearCacheDir($strDir)
    {
        $strDir = realpath($this->strBasedir."/".$strDir."/project/temp/cache");
        if (strpos($strDir, realpath($this->strBasedir)) === 0 && is_dir($strDir)) {
            $this->delDirrec($strDir);
        }
    }


    private function delDirrec($strDir)
    {
        $arrFiles = array_diff(scandir($strDir), ['.', '..']);
        foreach ($arrFiles as $strFile) {
            (is_dir("$strDir/$strFile")) ? $this->delDirrec("$strDir/$strFile") : unlink("$strDir/$strFile");
        }
        return rmdir($strDir);
    }

    private function generateListing()
    {
        $arrFiles = scandir($this->strBasedir);
        $arrFiles = array_diff($arrFiles, [".", "..", ".DS_Store"]);

        uasort($arrFiles, function ($strFile1, $strFile2) {
            if (is_dir($this->strBasedir."/".$strFile1) && is_dir($this->strBasedir."/".$strFile2)) {
                return strcmp($strFile1, $strFile2);
            }

            if (is_file($this->strBasedir."/".$strFile1) && is_file($this->strBasedir."/".$strFile2)) {
                return strcmp($strFile1, $strFile2);
            }

            if (is_file($this->strBasedir."/".$strFile1) && is_dir($this->strBasedir."/".$strFile2)) {
                return 1;
            } else {
                return -1;
            }
        });


        $arrReturn = [
            "content"    => ["folders" => [], "files" => []],
            "serverInfo" => ["phpversion" => phpversion(), "hostname" => $_SERVER['HTTP_HOST'], "webserver" => $_SERVER["SERVER_SOFTWARE"]],
        ];

        foreach ($arrFiles as $strOneFile) {
            if (@is_file($this->strBasedir."/".$strOneFile)) {
                $arrFile = ["name" => $strOneFile];

                if (!empty($_GET['showSize'])) {
                    $arrFile["size"] = $this->bytesToString($this->getSize($this->strBasedir."/".$strOneFile));
                }
                $arrReturn["content"]["files"][] = $arrFile;

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
                if (@is_file($this->strBasedir."/".$strOneFile."/core/.git/HEAD")) {
                    $arrFolder["branches"][] = ["name" => "core", "branch" => str_replace("ref: refs/heads/", "", file_get_contents($this->strBasedir."/".$strOneFile."/core/.git/HEAD"))];
                }
                if (@is_file($this->strBasedir."/".$strOneFile."/.git/modules/core/HEAD")) {
                    $arrFolder["branches"][] = ["name" => "core", "branch" => str_replace("ref: refs/heads/", "", file_get_contents($this->strBasedir."/".$strOneFile."/.git/modules/core/HEAD"))];
                }
                if (@is_file($this->strBasedir."/".$strOneFile."/.git/modules/core_agp/HEAD")) {
                    $arrFolder["branches"][] = ["name" => "core_agp", "branch" => str_replace("ref: refs/heads/", "", file_get_contents($this->strBasedir."/".$strOneFile."/.git/modules/core_agp/HEAD"))];
                }
                if (@is_file($this->strBasedir."/".$strOneFile."/.git/modules/core_customer/HEAD")) {
                    $arrFolder["branches"][] = ["name" => "core_customer", "branch" => str_replace("ref: refs/heads/", "", file_get_contents($this->strBasedir."/".$strOneFile."/.git/modules/core_customer/HEAD"))];
                }

                if (@is_dir($this->strBasedir."/".$strOneFile."/project/temp/cache")) {
                    $arrFolder["actions"][] = ["type" => "delcache", "enabled" => true];
                }

                if (!empty($_GET['showSize'])) {
                    $arrFolder["size"] = $this->bytesToString($this->getSize($this->strBasedir."/".$strOneFile));
                }

                $arrReturn["content"]["folders"][] = $arrFolder;
            }

        }


        return json_encode($arrReturn);
    }

    private function getSize($strPath)
    {
        $intBytes = 0;
        if (is_file($strPath)) {
            $intBytes = filesize($strPath);
        } elseif (is_dir($strPath)) {
            $arrFiles = scandir($strPath);
            $arrFiles = array_diff($arrFiles, [".", "..", ".DS_Store"]);
            foreach ($arrFiles as $strOneFile) {
                $intBytes += $this->getSize($strPath.DIRECTORY_SEPARATOR.$strOneFile);
            }
        }

        return $intBytes;
    }

    private function bytesToString($intBytes)
    {
        $strReturn = "";
        if ($intBytes >= 0) {
            $arrFormats = array("B", "KB", "MB", "GB", "TB");
            $intTemp = $intBytes;
            $intCounter = 0;
            while ($intTemp > 1024) {
                $intTemp = $intTemp / 1024;
                $intCounter++;
            }
            $strReturn = number_format($intTemp, 2)." ".$arrFormats[$intCounter];
            return $strReturn;
        }
        return $strReturn;
    }
}

header("Content-Type: application/json; charset=utf-8");
$objBackend = new Backend();
echo $objBackend->dispatch();
