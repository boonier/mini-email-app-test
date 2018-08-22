import React, {Fragment} from 'react';
// import {data} from './data';
import {fetchData, createMarkup} from './functions';


class SimpleMessageApp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showMessagePreview: false,
        };
    }

    showPreviewHandler = (id) => {
        this.setState({
            showMessagePreview: true,
            previewId: id
        })
    }

    componentDidMount() {
        fetchData('https://res.cloudinary.com/boonier/raw/upload/v1534931425/emails_kkiqnq.json')
            .then(response => response.json())
            .then(data => this.setState({data: data}));

        console.log(this.state);
    }

    render() {
        const showMessagePreview = this.state.showMessagePreview;
        let data = this.state.data;
        let result;

        if(data) {
            result = (
                <Fragment>
                    {showMessagePreview ? 
                    <MessagePreview id={this.state.previewId} data={data} /> : 
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

console.log(createMarkup);

function MessagePreview(props) {
    debugger
    const message = props.data.collection.items[props.id-1];
    return (
        <div className="message-preview-container">
            <div>
                <div className="message-preview-label">Message name:</div>
                <div className="message-preview-name">{message.name}</div>
            </div>
            
            <div>
                <div className="message-preview-label">Subject line:</div>
                <div className="message-preview-subject">{message.subjects[0]}</div>
            </div>

            <button className="message-preview-action">HTML</button>
            <button className="message-preview-action">Plain text</button>

            <div className="message-preview-body">
                <div className="injected" dangerouslySetInnerHTML={createMarkup(message.body.html)}></div>
            </div> 

        </div>
    );
}

class MessageListItem extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const {name, subjects, profileId} = this.props;
        
        return (
            <li className="message-item">
                <div className="message-name">{name}</div>
                <div className="message-subjects">{subjects}</div>
                <button className="message-action" onClick={this.props.showPreviewHandler.bind(this, profileId)}>More</button>
            </li>

        );
    }
}

export default function App() {
    return (
        <div className="simple-message-app">
            <h1>Pure360 React Tech Test</h1>
            <SimpleMessageApp  />
        </div>
    );
}
