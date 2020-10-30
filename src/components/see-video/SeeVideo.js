import React from 'react';

export const SeeVideo = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    // let token = urlParams.get('token');

    return (
        <iframe
            width="560"
            height="405"
            src={`${SERVER_URL}/media/`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Congratulation video"
            allowFullScreen>
        </iframe>
    )
}