## Tokopedia Play (Backend) | Generasi GIGIH 3.0 by GoTo Impact Foundation

### Description

Tokopedia Play is video streaming web applicaiton. This project is final assingment of Generasi GIGIH 3.0 program by GoTo Impact Foundation. This is the backend part of the project.

### Feature

Streaming a video, view product that related to the video and also comment on the video.

### How to install

You need to have Node.js installed on your machine.

Here is the step to run this project on your local machine:

Clore Repository

```bash
git clone https://github.com/Weitulezi/Gigih3.0_Tokopedia_Play_Backend.git
```

Navigate to project directory

```
cd Gigih3.0_Tokopedia_Play_Backend
```

Install dependencies

```
npm install
```

Run the app:

```
npm run start
```

or, to use a nodemon:

```
npm run dev
```

set the `const isProduction = false` inside `index.js` file.

# API

## Video

### GET /api/videos

Get videos

**Request**

-   **URL Params**: -
-   **Headers**: Content-Type: application/json
-   **Body**: -

**Response**:

-   **200**

```json
[
    {
        _id: string,
        title: string,
        thumbnailL: string,
        embedId: string,
        categories: [string],
        user: string
    }
]
```

### GET /api/videos/:videoId

Get a video

**Request**

-   **URL Params**: videoId
-   **Headers**: Content-Type: application/json
-   **Body**: -

**Response**:

-   **200**

```json
{
    _id: string,
    title: string,
    thumbnailL: string,
    embedId: string,
    categories: [string],
    user: string
}
```

### POST /api/videos

Create video

**Request**

-   **URL Params**: -
-   **Headers**: Content-Type: application/json, Authorization: `Bearer token`
-   **Body**:

```json
{
    _id: string,
    thumbnailL: string,
    embedId: string,
    category: {name: string},
}
```

**Response**:

-   **201**

```json
{
    video: {
        _id: string,
        title: string,
        thumbnailL: string,
        embedId: string,
        categories: [string],
        user: string
    },
    message: "Video is successfully created."
}
```

### PUT /api/videos/:videoID

Update a video

**Request**

-   **URL Params**: videoID
-   **Headers**: Content-Type: application/json, Authorization: `Bearer token`
-   **Body**:

```json
{
    _id: string,
    title: string,
    thumbnailL: string,
    embedId: string,
    category: {name: string},
}
```

**Response**:

-   **200**

```json
{
    _id: string,
    title: string,
    thumbnailL: string,
    embedId: string,
    category: {name: string}
}
```

### DELETE /api/videos/:videoID

Delete a video

**Request**

-   **URL Params**: videoID
-   **Headers**: Content-Type: application/json, Authorization: `Bearer token`
-   **Body**: -

**Response**:

-   **200**

```json
{
    "message": "Video is successfully deleted."
}
```
