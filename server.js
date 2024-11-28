const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // 서버가 사용할 포트 번호

app.use(cors()); // CORS 미들웨어 사용
app.use(bodyParser.json()); // JSON 본문 파싱

let posts = []; // 게시글을 저장할 배열

// GET 요청: 모든 게시글 가져오기
app.get('/posts', (req, res) => {
    console.log('GET /posts 요청이 들어왔습니다.'); // 로그 추가
    res.json(posts); // 게시글 배열 반환
});

// POST 요청: 새로운 게시글 추가하기
app.post('/posts', (req, res) => {
    const newPost = req.body.content; // 요청 본문에서 내용 가져오기
    posts.push(newPost); // 배열에 추가
    res.status(201).send(); // 성공 응답
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});