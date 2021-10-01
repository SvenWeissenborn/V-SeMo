<?php

$image = $_POST["image"];
$imageName = $_POST["image"];
$imageName = "uploads/" . explode(";", $imageName)[0] . "_" . date("d_m_Y_H_i") . ".png" ;
$image = explode(";", $image)[2];
$image = explode(",", $image)[1];
$image = str_replace(" ", "+", $image);
$image = base64_decode($image);

file_put_contents($imageName, $image);

//echo $imageName;

echo done;