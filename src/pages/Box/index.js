import React, { Component } from 'react';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Dropzone from 'react-dropzone';

import { MdInsertDriveFile } from 'react-icons/md';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './styles.css';

export default class Box extends Component {
    state = { box: {} };

    async componentDidMount() {
        const box = this.props.match.params.id;
        const response = await api.get(`boxes/${box}`);

        this.setState({ box: response.data });
    }

  render() {
    return (
        <div id="box-container">
            <header>
                <img src={logo} alt="" />
                <h1>{this.state.box.title}</h1>
            </header>

            <Dropzone>
                {({getRootProps, getInputProps}) => (
                    <div className="upload" {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <p>Arraste arquivos ou clique aqui</p>
                    </div>
                )}
            </Dropzone>

            <ul>
                { this.state.box.files && this.state.box.files.map(file => (
                    <li>
                        <a className="fileInfo" href={file.url} target="blank">
                            <MdInsertDriveFile size={24} color="#A5Cfff" />
                            <strong>{file.title}</strong>
                        </a>
                        <span>há {distanceInWords(file.createdAt, new Date(), {
                            locale: pt
                        })}</span>
                    </li>
                )) }
            </ul>
        </div>
    );
  }
}
