import { uploadImage, baseURL } from '../api';

export default class CustomUploadApdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload = () => {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            const formData = new FormData();
            console.log("Nhảy vào CustomUploadApdapter");
            formData.append('upload', file);
            uploadImage('posts/upload', formData)
                .then(res => {
                    resolve({
                        '700': `${baseURL}/${res.data.url}`,
                    })
                    console.log(res.data);
                })
                .catch(err => {
                    reject(err);
                    console.log("mài bị ngáo à lỗi rồi");
                });
        }))
    }
}