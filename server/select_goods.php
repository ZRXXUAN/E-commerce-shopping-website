<?php

include_once './config.php';

$value = $_POST['value'];
$page = $_POST['page'];
$line = $_POST['line'];

$startLine = ($page-1) * $line;

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT * FROM `goods` WHERE  `goods_name` LIKE '%{$value}%' LIMIT {$startLine}  , {$line}";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all( $result , MYSQLI_ASSOC);
//转json

// 查询所有的匹配的数据数量
$sqlAll = "SELECT COUNT(*) as `num` FROM `goods` WHERE `goods_name` LIKE '%{$value}%' ";
$stmtAll = mysqli_query($link, $sqlAll);
$numArr = mysqli_fetch_assoc($stmtAll);
$row = $numArr['num'];

// 根据数据总量和每页的数据数量,可以计算总页数
// 总页数 / 每页的数据数量  向上取整

$sumPage = ceil($row / $line); 


$resArr = [
    'data' => $arr,
    'row' => $row,
    'sumPage' => $sumPage,
    'page' => $page,
    'line' => $line
];

echo json_encode($resArr);