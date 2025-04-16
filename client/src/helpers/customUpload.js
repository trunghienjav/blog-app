import { uploadImage, baseURL } from '../api';

export default class CustomUploadApdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload = () => {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('upload', file);
            console.log("in ra formData");
            console.log(formData);
            
            uploadImage('posts/upload', formData)
                .then(res => {
                    if (res.data && res.data.uploaded && res.data.url) {
                        resolve({
                            default: res.data.url
                        });
                    } else {
                        reject(res.data?.error || 'Upload failed');
                    }
                })
                .catch(err => {
                    console.error("Upload error:", err);
                    reject(err.response?.data?.error || 'Upload failed');
                });
        }));
    }

    abort() {
        // Abort upload if needed
    }
}