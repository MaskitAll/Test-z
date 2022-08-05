<?php

// $name = $_POST['name'];
// $mail = $_POST['mail'];
// $theme = $_POST['theme'];
// $message = $_POST['message'];

// $name = htmlspecialchars($name);
// $message = htmlspecialchars($message);

// $name = urldecode($name);
// $message = urldecode($message);

// $name = trim($name);
// $message = trim($message);

// if (mail("fking94@mail.ru", "Theme ".$theme."\n", "ФИО: ".$name."\nMessage: ".$message)) {
//      echo "\nсообщение успешно отправлено";
// } else {
//     echo "\nпри отправке сообщения возникли ошибки";
// }

	
// Подключаем библиотеку PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
require 'D:\phpmailer\src\PHPMailer.php';
 
// Создаем письмо
$mail = new PHPMailer();
$mail->setFrom('maskit-zzz@list.ru', 'Иван Иванов'); // от кого (email и имя)
$mail->addAddress('fking94@mail.ru', 'Вася Петров'); // кому (email и имя)
$mail->Subject = 'Тест';                             // тема письма

// html текст письма
$mail->CharSet = 'UTF-8';
$mail->isHTML(true);

$mail->msgHTML("<html><body>
                <h1>Здравствуйте!</h1>
                <p>Это тестовое письмо.</p>
                </html></body>");
// Отправляем
if ($mail->send()) {
  echo 'Письмо отправлено!';
} else {
  echo 'Ошибка: ' . $mail->ErrorInfo;
}  
?>
