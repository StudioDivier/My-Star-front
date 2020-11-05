import React from 'react';

export const SeeVideo = () => {
    // const SERVER_URL = process.env.REACT_APP_SERVER_URL2;
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    // let token = urlParams.get('token');

    return (
        <>
            {/*<iframe*/}
            {/*    width="560"*/}
            {/*    height="405"*/}
            {/*    src={`${window.location.href}`}*/}
            {/*    frameBorder="0"*/}
            {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
            {/*    title="Congratulation video"*/}
            {/*    allowFullScreen>*/}
            {/*</iframe>*/}
            <video width="100%" height="100%" controls>
                <source src="https://exprome.ru:8080/media/congratulation/2/c29c5f1b-4175-4ee0-bdfc-acfa8ac02e40.mp4"
                        type="video/mp4" />
            </video>
        </>
)
}