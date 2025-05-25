// api/search.js

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'query 파라미터가 없습니다.' });
  }

  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=50`,
      {
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    const contentType = response.headers.get('content-type') || '';

    // JSON이 아니면 텍스트로 리턴
    if (!contentType.includes('application/json')) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('[API ERROR]', error);
    return res.status(500).json({
      error: '서버 오류',
      message: error.message || 'Unknown error',
    });
  }
}
