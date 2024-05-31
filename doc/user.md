# API Spec User

## Create User API

Endpoint : POST /api/user

Request Body :

```json
{
    "email": "pebzkruger@gmail.com",
    "password": "Feb12345",
}
```

Response Body Success :

```json
{
    "message": "CREATE new user success",
    "data": {
        "email": "pebzkruger@gmail.com",
        "password": "Feb12345"
    }
}
```

Response Body Error :

```json
{
    "error": "Email already exists",
    "message": "The email address is already registered. Please use a different email."
}
```

## Get ALL user By user API

Endpoint : GET /api/user

Response Body Success :

```json
{
    "message": "GET all user success",
    "data": [
        {
            "id_user": 2,
            "email": "pebzkruger@gmail.com",
            "password": "$2b$10$Al5Hyu9OHZFiMHXRJrZ4jOaeLJchrcssmHw6RvIKk/E3n3uMNyaHK",
            "nama_depan": "",
            "nama_belakang": "",
            "img_profile": {
                "type": "Buffer",
                "data": []
            },
            "role": "User"
        }
    ]
}
```

Response Body Error :

```json
{
    "error": "Not found",
    "message": "User not found"
}
```

## Get user By ID API

Endpoint : GET /api/user/:id_user

Response Body Success :

```json
{
    "message": "GET user by ID success",
    "data": {
        "id_user": 3,
        "email": "pebzkruger@gmail.com",
        "password": "$2b$10$i7DqSNAbSsnE.JAoHoUFhOxzZxM8dMgYgZebGItTj0lf9KYFnU1ki",
        "nama_depan": "",
        "nama_belakang": "",
        "img_profile": {
            "type": "Buffer",
            "data": []
        },
        "role": "User"
    }
}
```

Response Body Error :

```json
{
  "error": "Not Found",
  "message": "User not found"
}
```