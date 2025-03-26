<?php
error_reporting(E_ALL); // Affiche toutes les erreurs
ini_set('display_errors', 1); // Active l'affichage des erreurs

// Inclure les fichiers PHPMailer manuellement
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Utiliser les classes PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifier que les champs du formulaire sont définis et non vides
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
        die("Tous les champs du formulaire sont obligatoires.");
    }

    // Récupérer et valider les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    // Valider l'adresse e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Adresse e-mail invalide.");
    }

    // Configuration de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Paramètres du serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Serveur SMTP de Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'dewinnesullivan10@gmail.com'; // Votre adresse Gmail
        $mail->Password = 'mqua fayv kbqo tucr'; // Votre mot de passe d'application Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Chiffrement TLS
        $mail->Port = 587; // Port SMTP pour TLS

        // Destinataires
        $mail->setFrom('dewinnesullivan10@gmail.com', 'Portfolio Contact Form'); // Expéditeur fixe
        $mail->addAddress('dewinnesullivan10@gmail.com'); // Destinataire principal
        $mail->addReplyTo($email, $name); // Adresse de réponse (celle du formulaire)

        // Contenu de l'e-mail
        $mail->isHTML(true);
        $mail->Subject = 'Nouveau message de contact depuis votre portfolio';
        $mail->Body = "
            <h1>Nouveau message de contact</h1>
            <p><strong>Nom :</strong> $name</p>
            <p><strong>Email :</strong> $email</p>
            <p><strong>Message :</strong> $message</p>
        ";
        $mail->AltBody = "Nom : $name\nEmail : $email\nMessage : $message"; // Version texte brut

        // Envoyer l'e-mail
        $mail->send();
        echo 'Message envoyé avec succès !';
    } catch (Exception $e) {
        echo "Erreur lors de l'envoi du message : {$mail->ErrorInfo}";
    }
} else {
    // Rediriger ou afficher un message d'erreur si la méthode n'est pas POST
    header('Location: index.html'); // Redirige vers la page d'accueil
    exit(); // Arrête l'exécution du script
}
?>