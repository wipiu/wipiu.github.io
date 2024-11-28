const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // 사용할 포트 번호

app.use(cors()); // CORS 미들웨어 사용
app.use(bodyParser.json()); // JSON 본문 파싱

let posts = []; // 게시글을 저장할 배열

// GET 요청: 모든 게시글 가져오기
app.get('/posts', (req, res) => {
    console.log('GET /posts 요청이 들어왔습니다.');
    res.json(posts); // 게시글 배열 반환
});

// POST 요청: 새로운 게시글 추가하기
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1, // 게시글 ID 자동 생성
        content: req.body.content, // 요청 본문에서 내용 가져오기
    };
    posts.push(newPost); // 배열에 추가
    res.status(201).json(newPost); // 성공 응답과 함께 추가된 게시글 반환
});

// PUT 요청: 게시글 수정하기
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); // URL 파라미터에서 ID 가져오기
    const post = posts.find(p => p.id === postId); // 해당 ID의 게시글 찾기

    if (!post) {
        return res.status(404).send('게시글을 찾을 수 없습니다.'); // 게시글이 없을 경우
    }

    post.content = req.body.content; // 내용 수정
    res.json(post); // 수정된 게시글 반환
});

// DELETE 요청: 게시글 삭제하기
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); // URL 파라미터에서 ID 가져오기
    posts = posts.filter(p => p.id !== postId); // 해당 ID의 게시글 삭제
    res.status(204).send(); // 성공 응답
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});