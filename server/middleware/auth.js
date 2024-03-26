import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => { //request: dữ liệu đẩy lên từ client
    try {
        const token = req.headers.authorization.split(' ')[1];// cái này nó sẽ lấy đoạn token sau chữ bearer
        const isCustomAuth = token.length < 500; //nhỏ hơn 500 là token tạo khi sign up, not GG

        let decodedData;

        if (token && isCustomAuth) {
            console.log('Vào middleware, lấy token của user tự tạo');
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            console.log('Vào middleware, lấy token của gg');
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ message: error.message })
    }
};

export default auth;