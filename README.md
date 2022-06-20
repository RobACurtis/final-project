# final-project

#### A web application for surf photographers who want to showcase their work to the world. 

I built this full stack, single page application out of my love for surfing and my love for coding. I used to be a very active photographer, and I was a regular visitor to flickr.com as I browsed for inspiration for my own photography. I wanted to take on the challenge to replicate flickr's design and layout as well as put my own spin on it, and make an application exclusivley for surf photographers. 


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
  - JSON webtoken
  - Dotenv
  - npm
  - AWS S3
  - Heroku

  
  
 ## Feature List
  - User can delete a photo from their gallery.
  - User can scroll infintely in the explore page gallery
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
  - User can edit their profile info. 

# Development

### System Requirements 
- Node.Js 16 or higher
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
- You can create an account [here](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)

  ```shell
  AWS_ACCESS_KEY_ID=yourkey
  AWS_SECRET_ACCESS_KEY=yourkey
  AWS_S3_BUCKET=yourbucketname
    ```
    
1. Start PostgreSQL 

  ```shell
sudo service postgresql start
  ```
  
1. Check to see if PostgreSQL is running
    
```shell
sudo service postgresql status
  ```

1. Create a database (make sure it matches .env.example)

```shell
createdb yourDatabaseName
  ```

1. Import your database into Postgres

```shell
npm run db:import
  ```

1. Start the project. Once started, you can view the application by opening localhost:3000 in your browser

```shell
npm run dev
  ```


1. View your database through pgweb. Look at it in your browser at localhost:8081

```shell
pgweb --db=yourDatabaseName
  ```

