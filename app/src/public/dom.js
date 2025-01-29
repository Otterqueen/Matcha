
var menu = document.getElementById("gauche");
let liked_by = false;
let i_like = false;


function menu1(){
    fetch("http://localhost:8080/user")
        .then(response => response.text())
        .then(response => {
            if (response)
                login=response;
            else
                login="NomUser";
            if (login != "NomUser")
            {document.getElementById("login").innerHTML = "<i class=\"fas fa-power-off\"></i>Deconnection";
            document.getElementById("login").href = "/deco";
            document.getElementById("loginUser").style.display="flex";
            document.getElementById("loginUser2").innerHTML = "<i class=\"fas fa-user\"></i>"+login;}
            else{
                document.getElementById("loginUser").style.display="none";
            }
        });

    menu.innerHTML = '<div class="menu_head">Menu</div>'+ 
    '<div class="menu_elem"><a href="/"><i class="fas fa-home"></i>Accueil</a></div>'+
    '<div class="menu_elem"><a id="login" href="login"><i class="fas fa-power-off"></i>login</a></div>'+
    '<div class="menu_elem" id="loginUser"><a id="loginUser2" href="/profil"></a></div>'+
    '<div class="menu_elem"><a href="/chat"><i class="far fa-comments"></i>Chat</a></div>'+
    '<div class="menu_elem"><a href="/matchs"><i class="far fa-heart"></i>Matchs</a></div>'+
    '<div class="menu_elem"><a href="/recherche"><i class="fas fa-search"></i>Recherche</a></div>';
};

function wrong(){
    fetch("http://localhost:8080/wrong")
        .then(response => response.text())
        .then(response => {
            if (response != "")
            {
                document.getElementById("wrong").innerHTML = "<i class=\"far fa-times-circle\"></i>"+response;
                document.getElementById("wrong").style.display="flex";
            }
            else{
                document.getElementById("wrong").style.display="none";
            }
        });
}

function mail_alert(){
    fetch("http://localhost:8080/mail_alert")
        .then(response => response.text())
        .then(response => {
            if (response != "")
            {
                document.getElementById("mail_alert").innerHTML = "<i class=\"far fa-check-circle\"></i>"+response;
                document.getElementById("mail_alert").style.display="flex";
            }
            else{
                document.getElementById("mail_alert").style.display="none";
            }
        });
}

function affiche_profil(){
    fetch("http://localhost:8080/user")
        .then(response => response.text())
        .then(response => {
            if (response != "NomUser")
            {
                fetch("http://localhost:8080/User_compl")
                    .then(comp => comp.text())
                    .then(comp => {
                        if(comp == "1")
                        {
                            fetch("http://localhost:8080/mini_user")
                                .then(res => res.text())
                                .then(res => {
                                    if (res.length)
                                    {
                                        var princ = document.getElementById("principale");
                                        princ.innerHTML = res;
                                    }
                                    else
                                    {
                                        var princ = document.getElementById("principale");
                                        princ.innerHTML="<h1 style=\"color: #fffdff;\">pas de suggestion pour l'instant</h1>";
                                    }
                                })
                                .then(res =>{
                                    fetch("http://localhost:8080/tri")
                                    .then(res => res.text())
                                    .then(res => {
                                        if(res == "tri_loc")
                                        {
                                            var tab = document.getElementsByClassName("user_mini");
                                            for(var i = 0; i < tab.length-1; i++)
                                            {
                                                var regex2 = /(id="dist">)([\d]+)/g;
                                                tab[i].style.order=regex2.exec(tab[i].innerHTML)[2];
                                            }
                                        }
                                        
                                    });
                                });
                        }
                        else
                        {
                            var princ = document.getElementById("principale").innerHTML = "<h1 style=\"color: #fffdff;\">Pas de suggestion pour l'instant, veuillez completer votre profil.</h1>";
                        }
                    });
            }
            else
            {
                var princ = document.getElementById("principale");
                princ.innerHTML="<h1 style=\"color: #fffdff;\">Bienvenu sur matcha. Vous devez être connecté pour voir les suggestions.</h1>";
            }
        });
}

function profil_user(){
    var genre = document.getElementById("genre");
    var age = document.getElementById("age");
    var ville = document.getElementById("ville");
    var arr = document.getElementById("arr");
    fetch("http://localhost:8080/user_profil")
        .then(profil => profil.json())
        .then(profil => {
            if(profil[0].sexe == 0)
                genre.innerHTML="Genre : Homme"
            else
                genre.innerHTML="Genre : Femme"
            age.innerHTML="Age : "+profil[0].age;
            ville.innerHTML="Ville : "+profil[0].city;
            ville.innerHTML="Ville : "+profil[0].city;
            arr.innerHTML="Arrondissement : "+profil[0].arr;
        });

    fetch("http://localhost:8080/user_pref")
        .then(pref => pref.json())
        .then(pref => {
            if(pref[0].orientation == "homme")
            {
                document.getElementById("atti").checked = true;
            }
            else if(pref[0].orientation == "femme")
            {
                document.getElementById("atti2").checked = true;
            }
            else
            {
                document.getElementById("atti3").checked = true;
            }
            document.getElementById("bio").value=pref[0].bio;
            document.getElementById("tag").value=pref[0].tag;
        });

    fetch("http://localhost:8080/user_photo")
        .then(photo => photo.json())
        .then(photo => {
            document.getElementById("photo_profil").src=photo[0].photo_1;
            if(photo[0].photo_2)
            {
                document.getElementById("photo_2").src=photo[0].photo_2;
                document.getElementById("photo_2").style.display="flex";
            }
            if(photo[0].photo_3)
            {
                document.getElementById("photo_3").src=photo[0].photo_3;
                document.getElementById("photo_3").style.display="flex";
            }
            if(photo[0].photo_4)
            {
                document.getElementById("photo_4").src=photo[0].photo_4;
                document.getElementById("photo_4").style.display="flex";
            }
            if(photo[0].photo_5)
            {
                document.getElementById("photo_5").src=photo[0].photo_5;
                document.getElementById("photo_5").style.display="flex";
            }
        });
        
    fetch("http://localhost:8080/profil/users_vue")
        .then(vues => vues.text())
        .then(vues => {
            if(vues)
                document.getElementById("view").innerHTML=vues;
            else
                document.getElementById("view").innerHTML="Pas de dernieres vues.";
        });

    fetch("http://localhost:8080/profil/users_like")
        .then(like => like.text())
        .then(like => {
            if(like)
                document.getElementById("liker").innerHTML=like;
            else
                document.getElementById("liker").innerHTML="Pas de derniers like.";
        });
    fetch("http://localhost:8080/profil/current_user_detail")
        .then(detail => detail.json())
        .then(detail => {
            var pop = document.getElementById("pop");
            if(detail)
            {
                pop.innerHTML = detail.nb_vue + (detail.nb_like * 15);
            }
            
        });
        
    
}

function auto_compl(){
    var user = document.getElementById("user");
    var mail = document.getElementById("mail");
    var date = document.getElementById("date");
    var nom = document.getElementById("nom");
    var prenom = document.getElementById("prenom");
    var ville = document.getElementById("ville");
    var arr = document.getElementById("arr");
    

    fetch("http://localhost:8080/modif_user/auto_compl")
        .then(profil => profil.json())
        .then(profil => {
            var date_split = profil[0].naissance.split('T')[0];
            user.value = profil[0].login;
            mail.value = profil[0].mail;
            date.value = date_split;
            nom.value = profil[0].nom;
            prenom.value = profil[0].prenom;
            ville.value = profil[0].city;
            arr.value = profil[0].arr;

            console.log("profil[0]" + profil[0]);
            console.log("profil[0].sexe" + profil[0].sexe);

            if(profil[0].sexe == 1)
                document.getElementById("femme").checked = true;
            else
                document.getElementById("homme").checked = false;

        });

}

function profil_other(){
    var genre = document.getElementById("genre");
    var age = document.getElementById("age");
    var ville = document.getElementById("ville");
    var login = document.getElementById("Login_user");
    var status = document.getElementById("Status");
    var arr = document.getElementById("arr");
    fetch("http://localhost:8080/profil/get_profil")
        .then(profil => profil.json())
        .then(profil => {
            if(profil[0].sexe == 0)
                genre.innerHTML="Genre : Homme"
            else
                genre.innerHTML="Genre : Femme"
            age.innerHTML="Age : "+profil[0].age;
            ville.innerHTML="Ville : "+profil[0].city;
            if(profil[0].arr)
                arr.innerHTML="Arrondissement : "+profil[0].arr;
            login.innerHTML="Login : "+profil[0].login+"  Prenom : "+profil[0].prenom+"  Nom : "+profil[0].nom;
            if(profil[0].last_connection != null)
                status.innerHTML = "Dernière connection : "+profil[0].last_connection.split('T')[0];
            else
                status.innerHTML = "<i class=\"fas fa-circle\" style=\"color: green;\"></i> En ligne";

        });

    fetch("http://localhost:8080/profil/user_pref")
        .then(pref => pref.json())
        .then(pref => {
            if (pref[0].bio=="" || pref[0].tag=="")
            {
                document.getElementsByClassName("profil_user")[0].innerHTML = "Cet utilisateur n'a pas rempli son profil étendu"
            }
            else
            {
                if(pref[0].orientation == "homme")
                {
                    document.getElementById("orientation").innerHTML = "Attiré.e par : homme";
                }
                else if(pref[0].orientation == "femme")
                {
                    document.getElementById("orientation").innerHTML = "Attiré.e par : femme";
                }
                else
                {
                    document.getElementById("orientation").innerHTML = "Attiré.e par : homme et femme";
                }
                document.getElementById("bio").innerHTML=pref[0].bio;
                document.getElementById("tag").innerHTML=pref[0].tag;
            }
        });

    fetch("http://localhost:8080/profil/user_photo")
        .then(photo => photo.json())
        .then(photo => {
            document.getElementById("photo_profil").src=photo[0].photo_1;
            if(photo[0].photo_2)
            {
                document.getElementById("photo_2").src=photo[0].photo_2;
                document.getElementById("photo_2").style.display="flex";
            }
            if(photo[0].photo_3)
            {
                document.getElementById("photo_3").src=photo[0].photo_3;
                document.getElementById("photo_3").style.display="flex";
            }
        });

    fetch("http://localhost:8080/like/other_like_me")
        .then(liked => liked.json())
        .then(liked => {
            var other_like_me = document.getElementById("other_like_me");
            if(liked)
            {
                liked_by = true;
                other_like_me.innerHTML = "<i class=\"fas fa-heartbeat\"></i>Cet utilisateur vous aime";
            }
            else
            {
                other_like_me.style.display = 'none'; 
            }
            
        }).then(liked => {
            if(i_like && liked_by)
            {
                document.getElementById("other_like_me").style.display = 'none';
                document.getElementById("we_match").innerHTML = "<i class=\"fas fa-heartbeat\" style=\"color: #820000;\"></i> MATCH !!"
            }
        });
        
    fetch("http://localhost:8080/like/is_liked")
        .then(liked => liked.json())
        .then(liked => {
            var like = document.getElementById("like");
            if(liked)
            {
                i_like = true;
                like.href="/like/unlike"
                like.innerHTML = "Ne plus aimer ce profil";
            }
            else
            {
                like.href="/like"
                like.innerHTML = "Aimer ce profil"; 
            }
        })
        .then(liked => {
            if(i_like && liked_by)
            {
                document.getElementById("we_match").innerHTML = " <i class=\"fas fa-heartbeat\" style=\"color: #820000;\"></i> MATCH !!"
                document.getElementById("other_like_me").style.display = 'none';
            }
        });

    fetch("http://localhost:8080/profil/user_detail")
        .then(detail => detail.json())
        .then(detail => {
            var pop = document.getElementById("pop");
            if(detail)
            {
                pop.innerHTML = detail.nb_vue + (detail.nb_like * 15);
            }
            
        });
    
}