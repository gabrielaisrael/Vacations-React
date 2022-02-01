CREATE DATABASE vacationsdb;
USE vacationsdb;

CREATE TABLE users (
userId int auto_increment,
firstname varchar(255) not null,
lastname varchar(255) not null,
username varchar(255) not null,
password varchar(1000) not null,
isAdmin boolean,
primary key (userId)
);

CREATE TABLE vacations (
vacationId int auto_increment,
descriptionVacation varchar(255) NOT NULL,
destination varchar(255) NOT NULL,
img_url varchar(500),
dateGo date NOT NULL,
dateBack date NOT NULL,
price int NOT NULL,
followersSum int not null,
primary key(vacationId)
);


INSERT INTO users(firstname,lastname,username,password, isAdmin)
VALUES ("Gabriela", "Israel", "gabi", "123123", 0),
("Moshe", "Israel", "mosh", "123124", 0),
("Ana", "Skaba", "anana", "123125", 0),
("Michele", "Skaba", "mimi", "123126", 0),
("Jaqueline", "Rosembrach", "jaque", "123127", 0),
("Avraham", "Israel", "avi", "123128", 0),
("Yonatan", "Israel", "yoni", "123129", 0)

select * from users



INSERT INTO vacations (descriptionVacation, destination, img_url, dateGo, dateBack, price, followersSum)
VALUES ("Bahai Garden, Haifa Port, Haifa Beach", "Haifa", "https://media.timeout.com/images/103555351/630/472/image.jpg", "2020-11-10", "2020-11-12", 150, 3),
 ("Underwater Observatory Park, Snuba Diving, Ice Skating", "Eilat", "https://coralworld.co.il/wp-content/uploads/2015/09/Untitled-1.jpg", "2020-11-01", "2020-11-02", 250, 4),
  ("‪Galilee Sailing, Cruise, Haon Beach", "Kineret", "https://images.maariv.co.il/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_380,w_500/514589", "2020-11-05", "2020-11-07", 150, 2),
  ("‪The Western Wall, Mahane Yehuda Market, Ben Yehuda Street", "Jerusalem", "https://q-cf.bstatic.com/images/hotel/max1280x900/188/188765150.jpg", "2020-10-05", "2020-10-07", 150, 3),
  ("Medad Shalem Safed, Abuhav Synagogue, Ari Mikve ", "Tzfat", "https://www.israel-travel-secrets.com/wp-content/uploads/2016/12/The-Artist-Quarter.jpg", "2020-10-17", "2020-10-19", 200, 5),
   ("‪Mount Benta, Ramat HaGolan Winery, ‪Ramot Ranch‬ ", "Golan", "https://k6s3v6r4.ssl.hwcdn.net/pictures/834/834180.jpg", "2020-10-25", "2020-10-27", 200, 6)


 select * from vacations

CREATE TABLE followedVacations (
followId int auto_increment,
u_id int NOT NULL,
v_id int NOT NULL,
PRIMARY KEY(followId),
FOREIGN KEY(u_id) REFERENCES users(userId),
FOREIGN KEY(v_id) REFERENCES vacations(vacationId)
)

INSERT INTO followedVacations (u_id, v_id)
VALUES 
(1,2),
(2,3),
(3,4),
(4,5),
(5,6),
(6,1)


SELECT 
users.username,
vacations.descriptionVacation
FROM vacationsdb.followedvacations
JOIN users on users.userId = followedvacations.u_id
JOIN vacations on vacations.vacationId = followedvacations.v_id

WHERE users.userId = "1"

SELECT
userId, username, password, isAdmin
FROM vacationsdb.users

-- {"descriptionVacation":"jeru", "destination":"kotel", "img_url":"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_380,w_500/514589", "dateGO":"2020-10-03", "dateBack":"2020-10-05", "price":150}