# Proyecto shop-api
Equipo 12

Proyecto para la fase 3 del curso de desarrollo web de BEDU

Disponible en: <https://bedu-shop-14.herokuapp.com/>

# shop-api

API para el funcionamiento de una tienda en línea con la capacidad de registrar productos, ventas y reseñas.

## Instalación

    npm i

## Ejecución

    npm start

# REST API

A continuación se describen los endpoints disponibles.

## Resgistrarse como usuario

### Request

`POST /api/auth/signup`

    http://localhost:3000/api/auth/signup

### Body

    {
        "name": "",
        "lastname": "",
        "firstSurname": "",
        "secondSurname": "",
        "email": "",
        "password": ""
    }

## Login

### Request

`POST /api/auth/login`

    http://localhost:3000/api/auth/login

### Body

    {
        "email": "",
        "password": ""
    }

## Obtener usuarios

### Request

`GET /api/users`

    http://localhost:3000/api/users

## Crear producto

### Request

`POST /api/products`

    http://localhost:3000/api/products

### Body

    {
        "name": "",
        "description": "",
        "price": "",
        "image": ""
    }

## Actualizar producto

### Request

`PUT /api/products`

    http://localhost:3000/api/products

### Body

    {
        "name": "",
        "description": "",
        "price": "",
        "image": ""
    }

## Obtener productos

### Request

`GET /api/products`

    http://localhost:3000/api/products

## Filtrar productos

### Request

`GET /api/products/filter`

    http://localhost:3000/api/products/filter

### Params

    ?price= 
    ?brand= 
    ?search=

## Eliminar producto

### Request

`PATCH /api/products/:id`

    http://localhost:3000/api/products/1/

### Params

    /productId

## Crear venta

### Request

`POST /api/sales`

    http://localhost:3000/api/sales

### Body

    {
        "productID": "",
        "userID": ""
    }

## Actualizar venta

### Request

`PUT /api/sales`

    http://localhost:3000/api/sales

### Body

    {
        "productID": "",
        "userID": ""
    }

## Obtener ventas

### Request

`GET /api/sales`

    http://localhost:3000/api/sales

## Ventas por producto

### Request

`GET /api/sales/product/:id`

    http://localhost:3000/api/sales/product/1

### Params

    /productId

## Ventas por usuario

### Request

`GET /api/sales/user/:id`

    http://localhost:3000/api/sales/user/1

### Params

    /userId

## Eliminar venta

### Request

`PATCH /api/sales/:id`

    http://localhost:3000/api/sales/1/

### Params

    /saleId