import React, {Fragment} from 'react';
import {fetchData, createMarkup} from './functions';

const EMAILS_URL = 'https://res.cloudinary.com/boonier/raw/upload/v1534931425/emails.json';
const EMAIL_URLS = [
    'https://res.cloudinary.com/boonier/raw/upload/v1534936079/email-1.json',
    'https://res.cloudinary.com/boonier/raw/upload/v1534936078/email-2.json',
    'https://res.cloudinary.com/boonier/raw/upload/v1534936079/email-3.json'
];

class SimpleMessageApp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showMessagePreview: false,
        };
    }

    componentDidMount() {
        fetchData(EMAILS_URL)
            .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    showPreviewHandler = (id) => {
        fetchData(EMAIL_URLS[id-1])
            .then(response => response.json())
            .then(msg => this.setState({
                showMessagePreview: true,
                selectedMsg: msg
            }));        
    }

    backToListHandler = () => {
        this.setState({showMessagePreview: false});
    }

    render() {
        const showMessagePreview = this.state.showMessagePreview;
        let data = this.state.data;
        let result;

        if(data) {
            result = (
                <Fragment>
                    {showMessagePreview ? 
                    <MessagePreview id={this.state.previewId} data={this.state.selectedMsg} closePreview={this.backToListHandler} /> : 
                    <MessageList showPreviewHandler={this.showPreviewHandler} data={data} /> 
                    }
                </Fragment>
            );
        } else {
            result = null;
        }
        return result;
    }
}

function MessageList(props) {
    return (
        <div className="message-list-container">
            <ul className="message-list">
                {
                    props.data.collection.items.map( (message, idx) => {
                        let name = message.name;
                        let subjects = message.subjects;
                        let profileId = message.id;
                        let subjectOb = subjects.map((subject, idx) => {
                            return <a key={idx} href="#" className="message-subject">{subject}</a>;
                        });
                        return <MessageListItem key={idx} name={message.name} subjects={subjectOb} profileId={profileId} {...props} />;
                    })
                }
            </ul>
        </div>
    ) 
}

function MessageListItem (props) {
    const {name, subjects, profileId} = props;

    return (
        <li className="message-item">
            <div className="message-name">{name}</div>
            <div className="message-subjects">{subjects}</div>
            <button className="message-action" onClick={props.showPreviewHandler.bind(this, profileId)}>More</button>
        </li>

    );
    
}

class MessagePreview extends React.Component {

    constructor(props) {
        super();
        this.state = {
            type:'html'
        };
    }

    messageTypeHandler = (id) => {
        this.setState({
            type: id
        })
    }
    
    render() {

        const message = this.props.data;      

        return (
            <div className="message-preview-container">
                <div className="message-preview-close">
                    <button className="message-preview-action" onClick={this.props.closePreview}>Back to list</button>  
                </div>
                <div className="message-preview-header">
                    <div className="message-preview-row">
                        <div className="message-preview-label">Message name:</div>
                        <div className="message-preview-value">{message.name}</div>
                    </div>
                    
                    <div className="message-preview-row">
                        <div className="message-preview-label">Subject line:</div>
                        <div className="message-preview-value">{message.subjects[0]}</div>
                    </div>

                    <button className={'message-preview-action left ' + (this.state.type === 'html' ? 'message-preview-action--active': '')} onClick={this.messageTypeHandler.bind(this,'html')}>HTML</button>
                    <button className={'message-preview-action right ' + (this.state.type === 'text' ? 'message-preview-action--active': '')} onClick={this.messageTypeHandler.bind(this,'text')}>Plain text</button>
                </div> 
                <div className="message-preview-body">
                    <div className={"injected" + (this.state.type === 'text' ? ' plain': '')} dangerouslySetInnerHTML={createMarkup(message.body[this.state.type])}></div>
                </div> 

            </div>
        );
    }
}

export default function App() {
    return (
        <div className="simple-message-app">
            <h1>Pure360 React Tech Test</h1>
            <SimpleMessageApp />
        </div>
    );
}
