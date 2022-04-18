
# JSFS-Adama_TRAORÉ

# CREATION DU PROJET

`$ npm init`


pour utiliser a syntaxe des modules d'ES6 nous pouvons ajouter la ligne :

`"type" : "module"` dans package.json

## commencer par installer les modules de Node.js
`npm install`

## il faudra créer un fichier 

`main.js`  dans lequel nous placerons la définition du serveur dans le fichier package.json  nous pouvons allons ajouter 
`"start": "node main.js",`

on peut soit demarrer le serveur par la commande 

`$ npm run start` 
soit en installant 
`nodemon` 
avec la commande 
`$ npm install nodemon --global` L'installation de ce module comme <<global>> permettra d'utiliser la commande pour tous les projets, sans réinstallation.
puis saisissons la commande 
`$ nodemon`


# Responses aux questions qu tp2
5 °) oui tous les clients connectés reçoivent le même message au même moment.
6.2°) on remarque que le client continue de recevoir le nombre malgré sa déconnexion.

## pour la version 1:
la ligne de code this.#io.emit permet à tous les clients connectés de reçevoir  le nombre en meme temps  avec la ligne de socket.broadcast.emit

## alors que la version 2 :
le nombre sera adressé qu'à un seul client connecté.