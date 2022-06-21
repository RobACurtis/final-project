# surfr-photographer

#### A web application for surf photographers who want to showcase their photographs to the world. 

I built this full stack, single page application out of my love for coding and my love for surfing. I used to be a very active photographer, and I was a regular visitor to flickr.com as I browsed for inspiration for my own photography. I wanted to take on the challenge to replicate flickr's design and layout as well as put my own spin on it, and make an application exclusively for surf photographers. 


## Technologies Used
  - React
  - CSS
  - Bootstrap
  - JavaScript
  - Node.Js
  - Express.Js
  - PostgreSQL
  - HTML5
  - babel
  - Webpack
  - Argon2
  - Multer
  - JSON webtoken
  - Dotenv
  - npm
  - AWS S3
  - Heroku

  ## Live Demo
  
  Try the application live [surfr-photographer](https://surfr-photographer.herokuapp.com/)
  
 ## Feature List
  - User can delete a photo from their gallery.
  - User can scroll infinitely in the explore gallery.
  - User can upload images to a gallery
  - User can edit their profile image.
  - User can log into account.
  - User can create an account.
  - User can click a photographers card to view profile page of photographer.
  - User can toggle between exploring images and exploring user profiles.
  - User can click a single image to view it full screen.
  - User can view a gallery of collective surf photography from all users.

## Stretch Features 
  - User can log out.
  - User can see their profile photo in the navbar when logged in.
  - User can edit their profile information.
  
## Preview
![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/96838616/174843079-c363aff0-549b-46e0-a99d-fbc6d490dd97.gif)

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/96838616/174842746-ac49ebb7-a5cf-4c3f-91d6-0d857ff394bd.gif)

# Development

### System Requirements 
- Node.JS 16 or higher
- NPM 6 or higher
- Postgres


## Getting Started 

1. Clone the repository.

    ```shell
    git clone git@github.com:RobACurtis/final-project.git
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```
    
    
1. Create a new .env file from the .env.example and copy it.

    ```shell
   cp .env.example .env
    ```

1. This .env will require you to populate some information.
      - You will need an AWS account, AWS access key ID, secret access key, and unique bucket name.
      - This is because users will store their images via S3
      - You can create an account [here](https://portal.aws.amazon.com/billing/signup?refid=em_127222&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start/email)
      
  ```shell

        AWS_ACCESS_KEY_ID=yourkey
        AWS_SECRET_ACCESS_KEY=yourkey
        AWS_S3_BUCKET=yourbucketname  
  ```


5. Start postgreSQL.

  ```shell
sudo service postgresql start
  ```
6. Check if postgreSQL is running.
    
```shell
sudo service postgresql status
  ```

7. Create a database (make sure it matches .env.example.

```shell
createdb yourDatabaseName
  ```

8. Import your database into Postgres

```shell
npm run db:import
  ```

9. Start the project. Once started, you can view the application by opening localhost:3000 in your browser

```shell
npm run dev
  ```


10. View your database through pgweb. You can view it in your browser at localhost:8081

```shell
pgweb --db=yourDatabaseName
  ```

