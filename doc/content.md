# API Spec Content

## Create Content API

Endpoint : POST /api/contents

Headers :
- Authorization : token

Request Body :

```json
{
    "id": 1,
    "name": "nama kategori",
    "description": "deskripsi kategori",
    "image":"image.jpg"
}
```

Response Body Success :

```json
{
    "data" : {
        "id": 1,
        "name": "Organik",
        "description": "Sampah yang berasal dari bahan alami dan mudah terurai.",
        "image":"image.jpg"
    }
}
```

Response Body Error :

```json
{
  "error": "Bed Request",
  "message": "error message"
}
```

## Update Content API

Endpoint : PATCH /api/contents/:contentId

Headers :
- Authorization : token

Request Body :

```json
{
    "id": 1,
    "name": "Organik",
    "description": "Sampah yang berasal dari bahan alami dan mudah terurai.",
    "image":"image.jpg"
}
```

Response Body Success :

```json
{
    "data" : {
        "id": 1,
        "name": "Organik",
        "description": "Sampah yang berasal dari bahan alami dan mudah terurai.",
        "image":"image.jpg"
    }
}
```

Response Body Error :

```json
{
  "error": "Bed Request",
  "message": "Error Message"
}
```

## Get Content API

Endpoint : GET /api/contents



Response Body Success :

```json
{
    "data" : [
            {
            "id": 1,
            "name": "Organik",
            "description": "Sampah yang berasal dari bahan alami dan mudah terurai.",
            "image":"image.jpg"
        },
        {
            "id": 2,
            "name": "Anorganik",
            "description": "Sampah yang berasal dari bahan non-alami dan sulit terurai.",
            "image":"image.jpg"
        }
    ]
}
```

Response Body Error :

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```
## Get Content By ID API

Endpoint : GET /api/contents/:contentId



Response Body Success :

```json
{
    "data" : {
        "id": 1,
        "name": "Organik",
        "description": "Sampah yang berasal dari bahan alami dan mudah terurai.",
        "image":"image.jpg"
    }
}
```

Response Body Error :

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

## Remove Content API

Endpoint : DELETE /api/contents/:contentId

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : "ok"
}
```

Response Body Error :

```json
{
    "errors" : "Content is not found"
}
```

## Create Waste types API

Endpoint : POST /api/contents/wastes

Headers :
- Authorization : token

Request Body :

```json
{
    "id": 1,
    "name": "nama sampah",
    "description": "deskripsi sampah",
    "characteristics": [
        "karakteristik",
        "karakteristik",
        "karakteristik",
    ],
    "impacts": [
        "Dampak",
        "Dampak",
        "Dampak",
    ],
    "image":"image.jpg",
    "recyclingId": 1,
    "contentId":1
},
```

Response Body Success :

```json
{
    "data" : {
            "id": 1,
            "name": "Plastik",
            "description": "Sampah plastik yang sulit terurai.",
            "characteristics": [
                "Tidak Mudah Terurai",
                "Mengandung Bahan Kimia Berbahaya",
                "Berat dan Padat",
                "Tidak Memiliki Kandungan Organik"
            ],
            "impacts": [
                "Pencemaran lingkungan",
                "Merusak ekosistem alami",
                "Mempengaruhi keanekaragaman hayati"
            ],
            "image":"image.jpg",
            "recyclingId": 1,
            "contentId":1
        },
}
```

Response Body Error :

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

## Update Waste types API

Endpoint : PATCH /api/contents/wastes/:wasteId

Headers :
- Authorization : token

Request Body :

```json
{
    "id": 1,
    "name": "nama sampah",
    "description": "deskripsi sampah",
    "characteristics": [
        "karakteristik",
        "karakteristik",
        "karakteristik",
    ],
    "impacts": [
        "Dampak",
        "Dampak",
        "Dampak",
    ],
    "image":"image.jpg",
    "recyclingId": 1,
    "contentId":1
},
```

Response Body Success :

```json
{
    "data" : {
            "id": 1,
            "name": "Plastik",
            "description": "Sampah plastik yang sulit terurai.",
            "characteristics": [
                "Tidak Mudah Terurai",
                "Mengandung Bahan Kimia Berbahaya",
                "Berat dan Padat",
                "Tidak Memiliki Kandungan Organik"
            ],
            "impacts": [
                "Pencemaran lingkungan",
                "Merusak ekosistem alami",
                "Mempengaruhi keanekaragaman hayati"
            ],
            "image":"image.jpg",
            "recyclingId": 1,
            "contentId":1
        },
}
```

Response Body Error :

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

## Get Wastes By content API

Endpoint : GET /api/contents/:contentId/wastes



Response Body Success :

```json
{
   "data" : [
        {
            "id": 1,
            "name": "Plastik",
            "category": "Anorganik",
            "description": "Sampah plastik yang sulit terurai.",
            "characteristics": [
                "Tidak Mudah Terurai",
                "Mengandung Bahan Kimia Berbahaya",
                "Berat dan Padat",
                "Tidak Memiliki Kandungan Organik"
            ],
            "impacts": [
                "Pencemaran lingkungan",
                "Merusak ekosistem alami",
                "Mempengaruhi keanekaragaman hayati"
            ],
            "recycling_steps": [
                "Pisahkan plastik dari sampah lain",
                "Cuci bersih plastik",
                "Bawa ke pusat daur ulang terdekat"
            ]
        },
        {
            "id": 2,
            "name": "Kaca",
            "category": "Anorganik",
            "description": "Sampah kaca yang bisa didaur ulang.",
            "characteristics": [
                "Tidak Mudah Terurai",
                "Mengandung Bahan Kimia Berbahaya",
                "Berat dan Padat",
                "Tidak Memiliki Kandungan Organik"
            ],
            "impacts": [
                "Pencemaran lingkungan",
                "Merusak ekosistem alami",
                "Mempengaruhi keanekaragaman hayati"
            ],
            "recycling_steps": [
                "Pisahkan plastik dari sampah lain",
                "Cuci bersih plastik",
                "Bawa ke pusat daur ulang terdekat"
            ]
        }
    ]
}
```

Response Body Error :

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

## Remove Wastes API

Endpoint : POST DELETE /api/contents/:contentId/wastes/:wasteId

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : "ok"
}
```

Response Body Error :

```json
{
    "errors" : "Address is not found"
}
```

## Create Recycling Info API

Endpoint : POST /api/contents/recycling

Headers :
- Authorization : token

Request Body :

```json
{
  "waste_type_id": 1,
  "steps": [
    "step 1 description",
    "step 2 description",
    "step 3 description"
  ],
  "image": [
    "img.jpg",
    "img.jpg",
    "img.jpg"
  ]
}

```

Response Body Success :

```json
{
    "data" : {
        "id": 1,
        "waste_type": "Plastik",
        "steps": [
            "step 1 description",
            "step 2 description",
            "step 3 description"
        ],
        "image": [
            "img.jpg",
            "img.jpg",
            "img.jpg"
  ]
    }
}
```

Response Body Error :

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

## Get Recycling Info API

Endpoint : GET /api/contents/recycling




Response Body Success :

```json
{
    "data" : [
        {
            "id": 1,
            "waste_type": "Plastik",
            "steps": [
            "Pisahkan plastik dari sampah lain",
            "Cuci bersih plastik",
            "Bawa ke pusat daur ulang terdekat"
            ],
            "image": [
                "img.jpg",
                "img.jpg",
                "img.jpg"
  ]
        },
        {
            "id": 2,
            "waste_type": "Kertas",
            "steps": [
            "Pisahkan kertas dari sampah lain",
            "Cacah kertas menjadi potongan kecil",
            "Bawa ke pusat daur ulang terdekat"
            ],
            "image": [
                "img.jpg",
                "img.jpg",
                "img.jpg"
  ]
        }
        // ... lainnya
    ]
}
```

Response Body Error :

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

## Get Recycling Info By content API

Endpoint : GET /api/contents/recycling/:recyclingId



Response Body Success :

```json
{
    "data" : [
        {
            "id": 1,
            "waste_type": "Plastik",
            "steps": [
            "Pisahkan plastik dari sampah lain",
            "Cuci bersih plastik",
            "Bawa ke pusat daur ulang terdekat"
            ],
            "image": [
                "img.jpg",
                "img.jpg",
                "img.jpg"
  ]
        }
    ]
}
```

Response Body Error :

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

## Remove Recycling Info API

Endpoint : POST DELETE /api/contents/wastes/:wasteId/recycling/:recyclingId

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : "ok"
}
```

Response Body Error :

```json
{
    "errors" : "Address is not found"
}
```