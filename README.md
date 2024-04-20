# Français

## Configuration Initiale

Prérequis : Ouvrir deux terminaux - un pour le serveur front (front-end) et un pour le serveur back (back-end).

### Première Étape : Configuration du Serveur Front

Accédez à votre terminal dans votre IDE et initialisez le serveur frontal :

```
cd front
npm install
npm run dev
```

### Deuxième Étape : Configuration du Serveur Backend

Dans le deuxième terminal, initialisez le serveur backend :

```
cd back
npm install
node server.js
```

Ces commandes vous permettront d'accéder à la page d'accueil. Notez qu'il est nécessaire d'avoir une clé API de PandaScore, même si rien ne sera visible sans elle.

### Configuration Supplémentaire

Pour explorer davantage le site, vous devez créer un compte. Pour cela, migrez votre base de données avec Sequelize :

Mettez à jour vos informations de connexion pour votre base de données dans le fichier suivant :

***connexion/back/config/database.js***

Assurez-vous que le nom de la base de données correspond à celui que vous avez préalablement créé, car cela est crucial pour la suite.

Retournez dans le répertoire du serveur backend :

```
cd back
```
**Utilisez 'cd ..' si nécessaire pour remonter d'un niveau dans l'arborescence des dossiers**

Exécutez la commande suivante pour migrer la base de données :

```
npx sequelize-cli db:migrate
```

Cette commande créera la table User nécessaire pour la création de comptes utilisateurs et la connexion au site.

Il se peut que vous deviez redémarrer les serveurs après ces modifications. 
Pour ce faire, arrêtez les serveurs avec CTRL + C et relancez-les :

### Pour le serveur front :

```
npm run dev
```

### Pour le serveur backend :

```
node server.js
```

# English

## Initial Setup

Requirements: Open two terminals - one for the front-end server and one for the back-end server.

### Step One: Front-end Server Setup

Access your terminal in your IDE and initialize the front-end server:

```
cd front
npm install
npm run dev
```

### Step Two: Back-end Server Setup

In the second terminal, initialize the back-end server:

```
cd back
npm install
node server.js
```

These commands will allow you to access the homepage. Please note that a PandaScore API key is required, although nothing will be visible without it.

### Additional Configuration

To further explore the site, you need to create an account. To do this, migrate your database using Sequelize:

Update your database connection information in the following file:

***connexion/back/config/database.js***

Ensure the database name matches the one you previously created as this is essential for moving forward.

Return to the back-end server directory:

```
cd back
```
**Use 'cd ..' if needed to go up one level in the folder hierarchy**

Run the following command to migrate the database:

```
npx sequelize-cli db:migrate
```

This command will create the User table necessary for user account creation and site login.

You may need to restart the servers after these changes. 
To do so, stop the servers with CTRL + C and restart them:

### For the front-end server:

```
npm run dev
```

### For the back-end server:

```
node server.js
```

