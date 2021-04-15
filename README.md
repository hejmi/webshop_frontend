# 'The Geek Squeek' Web shop
The Geek Squeek web shop is a group project assignment in object oriented programming 2, Java by Tankesmedjan 2021 (SYSJG4 @ Newton Kompetensutveckling).
The team members of Tankesmedjan are [ChristofferGustafsson20](https://github.com/ChristofferGustafsson20), [mdanneil](https://github.com/mdanneil), [Richardsonn1](https://github.com/Richardsonn1) & [hejmi](https://github.com/hejmi) 

You can try our project by creating a Docker container containing both our application images and a mysql image by following the steps;

## Docker compose project

**Will create a project containing 3 images: mysql 5.7, geeksqueek_app-server and geeksqueek_app-client.**

1. Create project folder structure as demonstrated below

2. Pull Github repository for backend from:
   https://github.com/Tankesmedjan/webshop_geekshop.git, save it to folder `backend` under `root`.
   Move demo-dump.sql and docker-compose.yml from `root_files` to `root`

3. Pull Github repository for frontend from:
   https://github.com/Tankesmedjan/webshop_geekshop_frontend.git, save it to folder `frontend` under `root`

4. Build Docker container with Terminal from `root`: docker-compose -p geeksqueek up
   
5. Browse to http://localhost:3000 to view the web shop. (Backend will run on port 3001)

You can use BasicUser/pw1 to login as customer or Admin/pw2 to login as administrator in frontend


```
<root>
│
├── demo-dump.sql (from <root_files> in backend git)
├── docker-compose.yml (from <root_files> in backend git)
│
├── <backend> (from webshop_geekshop.git)
│   │
│   ├── dockerfile
│   └── ...
│
├── <frontend> (from webshop_geekshop_frontend.git)
│   │
│   ├── dockerfile
│   ├── nginx.conf
│   └── ...
```
