# Marketplace-server

It was developed during the NodeJS

## Installation

Install API with npm

```bash
  npm install
  npm run dev
```
    
## API Reference

#### Post SignIn

```http
  POST /user/signin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`        | `string` | **Required**. -> is e-mail|
| `password` | `string` | **Required**. > 2 characters|

#### Post SignUp

```http
  POST /user/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`         | `string` | **Required**. > 2 characters|
| `email`        | `string` | **Required**. -> is e-mail|
| `password` | `string` | **Required**. > 2 characters|


#### Get User
```http
  GET /user/me
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**|  


#### Set User Info
```http
  POST /user/me
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**|  
| `name` | `string` | ****|  
| `email` | `string` | ****|  
| `password` | `string` | ****|  

#### Get Module List
```http
  GET /get/list
```

#### Get Module Item Content
```http
  GET /get/item
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**|  

#### Create List
```http
  POST /create/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**|  
| `name` | `string` | **Required**|  
| `url` | `string` | **Required**|  
| `desc` | `string` | **Required**|  
| `imgPath` | `string` | **Required**|  
| `price` | `number` | **Required**|  

#### Create Offer
```http
  POST /create/offer
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**|  
| `price` | `number` | **Required**|  

#### Accept Offer
```http
  POST /accept/offer
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**|  
| `id` | `string` | **Required**|  
| `offerId` | `string` | **Required**|  

#### Buy Now
```http
  POST /accept/offer
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**|  
| `id` | `string` | **Required**|  
