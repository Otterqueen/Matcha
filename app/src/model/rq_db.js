var con = require('../db');

module.exports={
    get_mdp: function(login){
        var selectQuery = 'SELECT mdp, actif FROM utilisateur where login=?';
        var value = [login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if ( results.length == 1)
                { 
                    var firstResult = results[0];
                    success(results);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });
    },

    users_tri : function(city_user, tag, sexe, login, trier, filtrer){
        if(sexe!=3)
        {
            var base = 'SELECT login, age, city, sexe FROM utilisateur WHERE city=? AND sexe=? AND login!=?';
            var val = [city_user,sexe, login];
        } 
        else
        {
            var base = 'SELECT login, age, city, sexe FROM utilisateur WHERE city=? AND login!=?';
            var val = [city_user, login];
        }
        if (trier)
        {
            console.log("trier dans mini = ", trier);
            switch (trier) {
                case 'tri_age':
                    base = base + " ORDER BY age DESC";
                    break;
                case 'tri_loc':
                    base = base + " ORDER BY city DESC";
                    break;
                /*case 'tri_pop':
                    base = base + "ORDER BY popularite";
                    break;*/
                case 'tri_tag':
                    base = base + " ORDER BY tag DESC";
                    break;
                default:
                    break;
            }
        }
        selectQuery = base;
        return new Promise ((success, error) =>{
            con.query(selectQuery, val, (error, res, fields) => {
                if (error) throw(error);
                if (res.length)
                { 
                    var mini = "";
                    var i = res.length-1;
                    while(i >=0)
                    {
                        if (res[i].sexe == 0)
                        {
                            var mini = mini + "<div class=\"user_mini\"><div class=\"bd\"><i class=\"fas fa-mars\"></i><span>"+
                                    res[i].city+"</span></div><a href=\"/profil/login/"+res[i].login+"\"><img src=\"/default-user-image.png\"></a><div class=\"bd\"><span>"+
                                    res[i].login+"</span><span>"+res[i].age+"</span></div></div>";
                        }
                        else
                        {
                            var mini = mini + "<div class=\"user_mini\"><div class=\"bd\"><i class=\"fas fa-venus\"></i><span>"+
                                    res[i].city+"</span></div><a href=\"/profil/login/"+res[i].login+"\"><img src=\"/default-user-image.png\"></a><div class=\"bd\"><span>"+
                                    res[i].login+"</span><span>"+res[i].age+"</span></div></div>";
                        }
                        i--;
                    }
                    success(mini);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });
    },

    mini_user: function(login, trier, filtrer){
        var selectQuery = 'SELECT city, tag, orientation, age  FROM (utilisateur INNER JOIN preference ON preference.id = utilisateur.id_preference) WHERE login=?';
        console.log("requete = ",selectQuery);
        var value = [login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length == 1)
                {
                    var ret ="";
                    if(results[0].orientation=="homme")
                        sexe=0;
                    else if(results[0].orientation=="femme")
                        sexe=1;
                    else
                        sexe=3;
                    this.users_tri(results[0].city, results[0].tag, sexe, login, trier, filtrer).then(res => {
                        if (res)
                        {
                          ret = ret + res;
                        }
                        else
                        {
                          ret = "erreur";
                        }
                        success(ret);
                      })
                } 
                else
                {
                    success(0);
                }
            }
            );
        });

    },

    profil_user: function(login){
        var selectQuery = 'SELECT * FROM utilisateur WHERE login=?';
        var value = [login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length == 1)
                {
                    success(results);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });

    },

    pref_user: function(login){
        var selectQuery = 'SELECT orientation, bio, tag FROM (preference INNER JOIN utilisateur ON preference.id = utilisateur.id_preference) WHERE utilisateur.login=?';
        var value = [login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length)
                {
                    success(results);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });

    },

    photo_user: function(login){
        var selectQuery = 'SELECT id_photo_profile, photo_1, photo_2, photo_3, photo_4, photo_5 FROM (photo INNER JOIN utilisateur ON photo.id = utilisateur.id_photo) WHERE utilisateur.login=?';
        var value = [login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length)
                {
                    success(results);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });

    },

    update_pref: function(atti, bio, tag, login){
        var selectQuery = 'UPDATE (preference INNER JOIN utilisateur ON preference.id = utilisateur.id_preference) SET orientation=?, bio=?, tag=? WHERE utilisateur.login=?';
        var value = [atti, bio, tag, login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length)
                {
                    success(1);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });
    },

    modif_user: function(oldlogin, login, mail, genre, nom, prenom, adr){
        var selectQuery = 'UPDATE utilisateur SET login=?, mail=?, sexe=?, nom=?, prenom=?, city=? WHERE login=?';
        var value = [login, mail, genre, nom, prenom, adr, oldlogin];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length)
                {
                    success(1);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });
    },

    updade_mdp: function(login, mdp){
        var selectQuery = 'UPDATE utilisateur SET mdp=? WHERE login=?';
        var value = [mdp, login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length)
                {
                    success(1);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });
    },

    verif_mail: function(mail, login){
        var selectQuery = 'SELECT * FROM utilisateur WHERE login=? AND mail=?';
        var value = [login, mail];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length != 0)
                {
                    success(1);
                } 
                else
                {
                    success(0);
                }
            }
            );
        });
    },

    User_compl: function(login){
        var selectQuery = 'SELECT bio, tag FROM (preference INNER JOIN utilisateur ON preference.id = utilisateur.id_photo) WHERE login=?';
        var value = [login];
        return new Promise ((success, error) =>{
            con.query(selectQuery, value, (error, results, fields) => {
                if (error) throw(error);
                if (results.length != 0)
                {
                    if(results[0].bio && results[0].tag)
                    {
                        success(1);
                    }
                    else
                    {
                        success(0);
                    }
                } 
                else
                {
                    success(0);
                }
            }
            );
        });
    },



};

