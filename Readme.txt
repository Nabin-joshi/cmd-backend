register route : http://localhost:5000/api/auth/register, 
paylod: {
"username": "Nabin01",
"name" : "Nabin Joshi",
"email" : "nabinjoshi196@gmail.com",
"password" : "Password1",
"confirmPassword" : "Password1"
}

login route : http://localhost:5000/api/auth/login ,
paylod: 
{
"email" : "nabinjoshi196@gmail.com",
"password" : "Password1"
}

logout route : http://localhost:5000/api/auth/logout

refresh token route :  GET http://localhost:5000/api/auth/refresh

all the routes are protected 