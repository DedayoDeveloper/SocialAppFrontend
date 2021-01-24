import React from 'react';

export const Tab = (props) => {

    const tabSettings = props.settings;

    let linkElementsArray = [];
        for(let key in tabSettings){
            linkElementsArray.push({
                id: key,
                config: tabSettings[key]
            })
        }
    let tabLink = linkElementsArray.map(settings => (
        
            <li 
            key={settings.id} style={{flexGrow:'unset'}} 
            className="nav-item"
            onClick={() => props.toggleTab(settings.config.id)}>
                    <a 
                    className={[
                    "nav-link",
                        props.currentTab === settings.config.id
                            ? "active"
                            : "",
                        ].join(" ")} 
                    id={settings.id}
                    data-toggle="tab"
                    href={'#'+settings.config.id}
                    role="tab"
                    aria-controls={settings.config.id}
                    aria-selected="true">{settings.config.value}</a>
            </li>
    ))
    

    

    return(
        <React.Fragment>
        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
            {tabLink}
            
        </ul>

        <div id="myTab" className="tab-content">
            {props.children}
        </div>
        </React.Fragment>

    )
} 