# Application de Réseau Social - Test Technique

## Description

Ce projet est une application de réseau social simple permettant aux utilisateurs de publier des messages sur leur timeline personnelle, de lire les timelines d'autres utilisateurs, de suivre les timelines de plusieurs utilisateurs, de mentionner d'autres utilisateurs dans leurs messages, d'inclure des liens cliquables dans les messages et d'envoyer des messages directs privés.

## Fonctionnalités

- **Posting** : Les utilisateurs peuvent publier des messages sur leur timeline personnelle.
- **Reading** : Les utilisateurs peuvent voir la timeline d'autres utilisateurs.
- **Following** : Les utilisateurs peuvent s'abonner aux timelines d'autres utilisateurs et voir une liste agrégée de toutes leurs souscriptions.
- **Mentions** (feature optionnel) : Les utilisateurs peuvent mentionner d'autres utilisateurs dans leurs messages avec le symbole “@”.
- **Links** (feature optionnel) : Les utilisateurs peuvent inclure des liens cliquables dans leurs messages.
- **Direct Messages** (feature optionnel) : Les utilisateurs peuvent envoyer des messages privés à d'autres utilisateurs.

## Prérequis

Pour démarrer le projet, vous devez avoir les éléments suivants installés sur votre système :

- Docker
- Docker Compose

## Démarrage du Projet

Pour démarrer le projet, suivez ces étapes :

1. Clonez le dépôt du projet :

```bash
git clone https://github.com/BigApps-Lab/social-network-kata.git
```

2. Déplacez-vous dans le répertoire du projet :

```bash
cd social-network-kata
```

Renommer le fichier .env.exemple :

```bash
mv .env.exemple .env
```

3. Construisez et démarrez les conteneurs avec Docker Compose :

```bash
docker-compose up --build
```

Après avoir exécuté ces commandes, l'application sera accessible à l'adresse

```bash
http://localhost:3000
```

Pour mettre à jour le schéma de la base de données avec Prisma, exécutez :

```bash
npm run push:db
```

Cette commande est équivalente à `prisma db push`.

Pour lancer Prisma Studio et interagir avec votre base de données via une interface utilisateur, exécutez :

```bash
npm run studio:db
```

Ceci ouvrira Prisma Studio à l'adresse `http://localhost:5555`.

Après avoir exécuté ces commandes, l'application sera accessible à l'adresse `http://localhost:3000`.

## Arrêt du Projet

Pour arrêter le projet, utilisez la commande suivante :

```bash
docker-compose down
```

Cette commande arrêtera et supprimera les conteneurs créés par Docker Compose.

## Structure du Projet

- `app/` : Contient le code source de l'application Next.js.
- `prisma/` : Contient le schéma de la base de données et les migrations Prisma.
- `Dockerfile` : Définition pour construire l'image Docker de l'application.
- `docker-compose.yml` : Configuration pour démarrer l'application avec ses services associés.

## Ressources pour Aider le Candidat

Pour en savoir plus sur les technologies utilisées dans ce projet, consultez les documentations officielles :

- [Prisma Documentation](https://www.prisma.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

# social-network-kata
