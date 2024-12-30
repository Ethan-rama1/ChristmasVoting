# ChristmasVoting

Below is a comprehensive guide to setting up and saving the Docker container which has the database. I'm assuming you have a Docker account and the Docker Desktop application installed on your computer. If you don't have either of these, I would recommend setting them up before continuing. 

## Database
### Backend Setup
* To start, you will need to clone the repository which contains the Dockerfile named ```Dockerfile``` and the SQL script named ```database_dump.sql``` which contains the SQL for initializing the database and adding in its data.
  
* Next, you will need to open up CMD Line or a shell and navigate to your repository's root directory (Where the ```Dockerfile``` and ```database_dump.sql``` files are located). You will need to build the Docker image to set up the container. To do this, run the following command: <br><br>
  ```
  docker build -t mysql/mysql-server:latest .
  ```
  This will build the mysql-server image on Docker needed for the container. When you do this, the ```Dockerfile``` will execute and set up the users and their credentials for accessing the database, the port in which the server will run on, and attach the SQL script to the container's file directory. The script will run since it is in the ```/docker-entrypoint-initdb.d/``` directory which automatically runs ```.sql``` files.

* You will need to run the Docker container. To do this, you will run the following command:
  ```
  docker run -d --name christmasvoting -p 3306:3306 mysql/mysql-server:latest
  ```
  This will create a MySQL container in which you can use to access the database.

  Congratulations! You have now loaded in the ChristmasVoting database via Docker container.

### Saving Database
To save your database instance from your Docker container, you will need to run the following command while your container is running:
```
docker exec -it christmasvoting mysqldump -uroot -p christmasvotingdb > ./database_dump.sql
```
Type in the root user's password and then copy the file to your computer. You will need to edit the file and remove the line ```Enter password:``` at the top of the SQL file which can cause problems when setting up your database later when pulling from GitHub. I haven't figured out a solution for this yet, but if I find one, I will update this part of the README. Also, you will have to add the line ```USE christmasvotingdb;``` right before the table creation lines near the beginning of the file, otherwise, you will have to manually run the script in an SQL console and you don't want to do that extra work.

### Credentials
* Below are the list of credentials you can use to access the database (you can also look in the ```Dockerfile``` for this information): <br><br>
  ```
  user  | password
  ------------------
  root  | password
  user  | s3cr3tb0x
  ```

## Application
### Setup
To run this app in development mode, you will need to have the react libraries/modules installed. This can be done from the frontend directory in the project and running ```npm install```. 

### Running the app
To now run the app, make sure you are in the frontend directory and run the following command:\
```npm run start``` to run a general version of the app, accessible from the Web.\

## - UPDATES -
* You no longer have to run the script  ```SOURCE /docker-entrypoint-initdb.d/database_dump.sql;``` to load the data. Just add the line ```USE christmasvotingdb;``` before the table creation and the Dockerfile will automatically do everything for you.

