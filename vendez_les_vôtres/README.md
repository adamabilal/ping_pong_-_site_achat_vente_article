## Binôme

- L3 Info Groupe 3
- Adama TRAORÉ
- Narimane TAHIR


## Introduction au projet
Ce projet mongo a pour but de créer une application web permettant la creation d'articles ainsi que la vente et l'achat d'articles.


## HOW TO
  * recuperer le dépôt:

  * sur le terminal de commande saisissez :
          >>> git clone git@gitlab-etu.fil.univ-lille1.fr:traorea/jsfs-adama_traore.git

  * Installer les dépendances :
            * dans la racine du projet (vendez_les_vôtres) :
            >> npm install

  * Démarrer l'application :
            * dans la racine du projet (vendez_les_vôtres) :
            >>> nodemon

  * lancer l'application :
            * dans un navigateur :
            >>> http://localhost:3000

##  Initialiser la base de données.
   * run le mongo :
             * dans la racine du projet (vendez_les_vôtres) :
            >> sudo service mongod start
             * dans la racine du projet (vendez_les_vôtres) pour voir l'etat  :
            >> sudo service mongod status

              * dans la racine du projet (vendez_les_vôtres) créer la base de données `data`  :
            >> mkdir data
            >> mongod --dbpath data

             * dans la racine du projet (vendez_les_vôtres) on peut aussi consulter sur le terminal les saisies :
            >> mongo



## Eléments de conception important
          #les routes :
             * user : permet la gestion des routes suivants:
                        post (json body nécessaire ) --> "user/create" --> pour creer un nouveau user
                        update (json body nécessaire ) --> "user/update/:userid" --> pour mettre à jour le user ayant iduser comme id
        

             * good :  permet la gestion des routes suivants:
                            get --> "goods" --> pour afficher tous les goods
                            post (json body nécessaire ) --> "goods/create" --> pour creer un nouveau good
                            update (json body nécessaire ) --> "goods/:goodId"--> pour mettre à jour le good ayant iduser comme id
                            delete  --> "goods/:goodId" --> pour supprimer le good ayant iduser comme id

          #les controlleurs:
             * user : permet de : ajouter,supprimer, modifier, les articles dans (de) la base de données.


          #l'authentification
          #les views


### difficultés rencontrées:
        # ajout des éléments dans la liste des articles