import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            excel_data: '',
        };
    }

    async submit(e) {
        e.preventDefault();
        const url = `http://localhost:4000/invoices/create`;
        const formData = new FormData();
        formData.append('body', this.state.excel_data);
        const info = {
            headers: {
                'content-type': 'multipart/form-data',
                'token': 'xxx'
            },
        };
        const HTTP = axios.create({
            withCredentials: true,
            headers: {
                authorization: 'sagar' ,
                'Content-Type':'application/json'
             }
        });

        return HTTP.post(url, formData, info);
    }

    setData(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={e => this.submit(e)}>
                    <div className="col-sm-12 btn btn-primary">
                        Task - File Upload
                    </div>
                    <h1>Invoices</h1>
                    <input type="file" onChange={e => this.setData(e)} />
                    <button className="btn btn-secondary" type="submit">Upload</button>
                </form>
            </div>
        );
    }
}

export default Upload;
