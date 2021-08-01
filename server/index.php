<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
    header('Content-type: application/json; charset=UTF-8'); 
    Header('always set Access-Control-Max-Age: 1000');
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    
    
    try {
        global $db;
        $db = new PDO('mysql:host=localhost;dbname=archeo;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ));
    } catch (PDOException $e) {
        echo 'Connexion échouée : ' . $e->getMessage();
    }

    $result = array('error'=>false);

    switch ($_GET['action']) {
        case "register":
            register();
            break;
        case "login":
            login();
            break; 
        case "categories":
            getAllCategories();
            break;  
        case "posts":
            getAllPosts();
            break; 
        case "detailPosts":
            getPost();
            break;     
        case "sendMsg":
            sendMessage();
            break;
        case "postsHome":
            getPostsHome();
            break; 
        case "pay":
            paiement();
            break; 
        case "libelleCategories":
            libelleCategories();
            break; 
        case "createPost":
            createPost();
            break;   
        case "deletePost":
            deletePost();
            break; 
        case "editPost":
            editPost();
            break; 
        case "getQuantity":
            getQuantity();
            break;
        default:
            echo "Action incorrecte";    
    }
    
    //fonction création de compte
    function register(){
        $registerPost = json_decode(file_get_contents('php://input'), true);
        global $db;
        if(empty($registerPost['name']) || empty($registerPost['email']) || empty($registerPost['password'])){
            $result['error'] = true;
            $result['message'] = "Remplissez tous les champs !!!";
        }else if(!filter_var($registerPost['email'], FILTER_VALIDATE_EMAIL)) {
            $result['error'] = true;
            $result['message'] = "L'adresse email ".$registerPost['email']." est considérée comme invalide.";
        }
        else{
            $sql = $db->prepare('SELECT * FROM user WHERE email=?');
            $sql->execute(array($registerPost['email']));
            if($sql->fetchAll()){
                $result['error'] = true;
                $result['message'] = "Un utilisateur existe déjà avec cette adress email!!!";
            }
            else{
                $pass = password_hash($registerPost['password'], PASSWORD_DEFAULT);
                $sql = $db->prepare('INSERT INTO user(name, email, password) VALUES(?,?,?)');
                $row = $sql->execute(array($registerPost['name'], $registerPost['email'], $pass));
                if($row){
                    $result['error'] = false;
                    $result['message'] = "Utilisateur crée avec succès !!!";
                }
                else{
                    $result['error'] = true;
                    $result['message'] = "requête échouée";
                }
            }
        }
        echo json_encode($result);
    }
    
    //fonction de connexion
    function login(){
        $loginPost = json_decode(file_get_contents('php://input'), true);
        global $db;
        if(empty($loginPost['email']) || empty($loginPost['password'])){
            $result['error'] = true;
            $result['message'] = "Remplissez tous les champs !!!";
        }
        else{
            $sql = $db->prepare("SELECT * FROM user WHERE email=?");
            $sql->execute(array($loginPost['email']));
            $data = $sql->fetch(PDO::FETCH_ASSOC);
            if($data){
                $passChecked = password_verify($loginPost['password'], $data['password']);
                if($passChecked){
                    $result['error'] = false;
                    $result['user'] = $data;
                }
                else{
                    $result['error'] = true;
                    $result['message'] = "Mot de passe incorrect!!!";
                }
            }
            else{
                $result['error'] = true;
                $result['message'] = "Email ou mot de passe incorrect";
            }
        }
        echo json_encode($result);
    }

    //fonction pour récupérer toutes les catégories
    function getAllCategories(){
        global $db;
        $sql = $db->prepare("SELECT p.id_categories as id, c.libelle, count(p.id_categories) as quantite FROM categories c INNER JOIN posts p ON c.id = p.id_categories WHERE type=? GROUP BY p.id_categories");
        $sql->execute(array($_GET['type']));
        $categories = array();
        $all = 0;
        while($data = $sql->fetch(PDO::FETCH_ASSOC)){
            $all = $all + $data['quantite'];
            array_push($categories, $data);
        }
        // $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        if($categories){
            $result['error'] = false;
            $result['quantite'] = $all;
            $result['categories'] = $categories;
        }
        else{
            $result['error'] = true;
            $result['categories'] = "Erreur";
        }
        echo json_encode($result);
    }

    //fonctions pour récupérer les posts
    function getAllPosts(){
        global $db;
        $posts = array();
        if(!$_GET['categories']){
            $sql = $db->prepare('SELECT * FROM posts WHERE type=? LIMIT '.$_GET['limit']);
            $sql->execute(array($_GET['type']));
            while($data = $sql->fetch(PDO::FETCH_ASSOC)){
                $tag = explode(",", $data['tag']);
                $dateNew1 = new DateTime($data['date']);
                $dateNew = $dateNew1->format('d-M-Y');
                $date = explode("-", $dateNew);
                $data['date'] = $date;
                $data['tag'] = $tag;
                array_push($posts, $data);
            }
        }else{
            $sql = $db->prepare('SELECT * FROM posts WHERE id_categories=? AND type=? LIMIT '.$_GET['limit']);
            $sql->execute(array($_GET['categories'], $_GET['type']));
            while($data = $sql->fetch(PDO::FETCH_ASSOC)){
                $tag = explode(",", $data['tag']);
                $dateNew1 = new DateTime($data['date']);
                $dateNew = $dateNew1->format('d-M-Y');
                $date = explode("-", $dateNew);
                $data['date'] = $date;
                $data['tag'] = $tag;
                array_push($posts, $data);
            }
        }
        $result['error'] = false;
        $result['posts'] = $posts;
        echo json_encode($result);
    }

    //fonction pour récupérer un post par son id
    function getPost(){
        global $db;
        $sql = $db->query('SELECT * FROM posts WHERE id='.$_GET['postId']);
        $data = $sql->fetch(PDO::FETCH_ASSOC);
        if($data){
            $tag = explode(",", $data['tag']);
            $data['tag'] = $tag;
            $dateNew1 = new DateTime($data['date']);
            $dateNew = $dateNew1->format('d-M-Y');
            $date = explode("-", $dateNew);
            $data['date'] = $date;

            $result['error'] = false;
            $result['post'] = $data;
        }else{
            $result['error'] = true;
            $result['post'] = "Error";
        }
        
        echo json_encode($result);
    }


    //fonction pour envoyer un message aux administrateur du site
    function sendMessage(){
        $mailData = json_decode(file_get_contents('php://input'), true);
        global $db;
        $name = $mailData['name'];
        $email = $mailData['email'];
        $subject = $mailData['subject'];
        $msg = $mailData['message'];
        if(empty($name) || empty($email) || empty($subject) || empty($msg)){
            $result['error'] = true;
            $result['message'] = 'Remplissez tous les champs';
        }else{
            
            require 'PHPMailer/PHPMailerAutoload.php';
            $mail= new PHPMailer;
            $mail->Host='smtp.gmail.com';
            $mail->Port=587;
            $mail->isSMTP();
            $mail->SMTPAuth=true;
            $mail->SMTPSecure='tls';
            $mail->Username='archeog4@gmail.com';//Your Email Address
            $mail->Password='projetarcheo';//Your Email Password
            $mail->setFrom('archeog4@gmail.com', $name);
            $mail->addAddress('archeog4@gmail.com');//Receiver Email
            $mail->addReplyTo($email);
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Subject= $subject;
            $mail->Body='
            <h2>Mail reçu de </h2><br>
            <b>Nom : </b>'.$name.'<br>
            <b>Email : </b>'.$email.'<br>
            <b>Voici son message : </b>'.$msg;
            if(!$mail->send())
            {
                $result['error'] = true;
                $result['message'] = 'Erreur, message n\'a pas été envoyé';
            }
            else
            {
                $sql = $db->prepare('INSERT INTO messages(nom,email,subject,message) values(?,?,?,?)');
                $row = $sql->execute(array($name,$email,$subject,$msg));
                if($row){
                    $result['error'] = false;
                    $result['message'] = 'Message envoyé avec success';
                }else{
                    $result['error'] = true;
                    $result['message'] = 'Erreur, message n\'a pas été envoyé, veuillez réessayer';
                }
            }
        }
        echo json_encode($result);
    }

    function getPostsHome(){
        global $db;
        if($_GET['type']){
            if($_GET['type'] == "all"){
                $sql = $db->query('SELECT * FROM posts ORDER BY date DESC LIMIT '.$_GET['limit']);
                $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            }else{
                $sql = $db->prepare('SELECT * FROM posts WHERE type=? ORDER BY date DESC LIMIT '.$_GET['limit']);
                $sql->execute(array($_GET['type']));
                $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            }
        }else{
            $sql = $db->query('SELECT * FROM posts ORDER BY date DESC LIMIT '.$_GET['limit']);
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        }
        if($data){
            $result['error'] = false;
            $result['posts'] = $data;
        }else{
            $result['error'] = true;
            $result['posts'] = "Erreur";
        }
        echo json_encode($result);
    }

    function getQuantity(){
        global $db;
        if($_GET['type'] == "all"){
            $sql = $db->query('SELECT COUNT(*) FROM posts');
            $data = $sql->fetch();
        }else{
            $sql = $db->prepare("SELECT COUNT(*) FROM posts WHERE type=?");
            $sql->execute(array($_GET['type']));
            $data = $sql->fetch();
        }
        if($data){
            $result['error'] = false;
            $result['qte'] = $data[0];
        }else{
            $result['error'] = true;
            $result['qte'] = "Erreur";
        }
        echo json_encode($result);
    }

    function paiement(){
        $DonsData = json_decode(file_get_contents('php://input'), true);
        global $db;
        if(empty($DonsData['commentaire'])){
            $sql = $db->prepare('INSERT INTO dons(nom,email,adresse,telephone,montant) values(?,?,?,?,?)');
            $row = $sql->execute(array($DonsData['name'],$DonsData['email'],$DonsData['adress'],$DonsData['number'],$DonsData['price']));
        }else{
            $sql = $db->prepare('INSERT INTO dons(nom,email,adresse,telephone,montant,commentaire) values(?,?,?,?,?,?)');
            $row = $sql->execute(array($DonsData['name'],$DonsData['email'],$DonsData['adress'],$DonsData['number'],$DonsData['price'],$DonsData['commentaire']));
        }
        if($row){
            $result['error'] = false;
            $result['message'] = 'Paiement enregistré';
        }else{
            $result['error'] = true;
            $result['message'] = 'Paiement non enregistré';
        }
        echo json_encode($result);
    }

    function libelleCategories(){
        global $db;
        $sql = $db->query("SELECT * FROM categories");
        $categories = $sql->fetchAll(PDO::FETCH_ASSOC);
        if($categories){
            $result['error'] = false;
            $result['categories'] = $categories;
        }
        else{
            $result['error'] = true;
            $result['categories'] = "Erreur";
        }
        echo json_encode($result);
    }

    function deletePost(){
        global $db;
        $sql = $db->query("DELETE FROM posts WHERE id=".$_GET['id']);
        if($sql){
            $result['error'] = false;
            $result['message'] = 'Le post a été supprimer avec success !!!';
        }
        else{
            $result['error'] = true;
            $result['categories'] = "Erreur";
        }
        echo json_encode($result);
    }


    function createPost(){
        global $db;
        $target_dir = "../src/assets/images/posts/"; //image upload folder name
        $image = time().basename($_FILES["image"]["name"]);
        $target_file = $target_dir . $image;
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {   
            $sql = $db->prepare('INSERT INTO posts(titre,auteur,date,image,description,tag,id_categories,type) VALUES(?,?,?,?,?,?,?,?)');
            $row = $sql->execute(array($_POST['titre'],$_POST['auteur'],date('Y-m-d'),$image,$_POST['description'],$_POST['tag'],$_POST['id_categories'],$_POST['type']));
            if($row){
                $result['error'] = false;
                $result['data'] = 'Le post a été crée avec success !!!';
            }else{
                $result['error'] = true;
                $result['data'] = 'Création échouée !!!';
            }
        }else{
            $result['error'] = true;
            $result['data'] = 'Création échouée !!!';
        }
        echo json_encode($result);
    }


    function editPost(){
        global $db;
        $editPostData = json_decode(file_get_contents('php://input'), true);
        $sql = $db->prepare('UPDATE posts SET titre=?, auteur=?, description=?, tag=?, id_categories=?, type=?');
        $row = $sql->execute(array($editPostData['titre'],$editPostData['auteur'],$editPostData['description'], $editPostData['tag'], $editPostData['type'],$editPostData['categories']));
        if($row){
            $result['error'] = false;
            $result['message'] = 'Le post a été éditer avec success !!!';
        }else{
            $result['error'] = true;
            $result['message'] = 'Edition échouée !!!';
        }
        echo json_encode($result);
    }
?>