# Marketplace-server

It was developed using express.

## Installation

Install API with npm

```bash
  npm install
  npm run dev
```
    
## API Reference

#### Post SignIn

```http
  POST /user/sign
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `address`        | `string` | **Required**. -> is address|


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
| `address` | `string` | ****|  

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
| `token` | `string` | **Required**|  


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
| `file` | `file` | **Required**|  


#### Create Offer
```http
  POST /create/offer
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**|  
| `token` | `string` | **Required**|  
| `price` | `number` | **Required**|  
| `offer` | `string` | **Required**|  

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
