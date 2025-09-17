Firstly you need to install such libraries for server: node nodemon express dotenv mongoose mogodb express-fileupload. You can do it with npm install.\
Also you need to create a file .env with next data:
PORT
DB_USER
DB_PASSWORD
DB_NAME = chronus_db 
JWT_SECRET
BASE_URL
HOST = smtp.gmail.com
SERVICE = Gmail\
EMAIL_PORT = 3002\
SECURE = true\
USER
PASS

All variables, which are without any value you need to fill with your data by yourself


