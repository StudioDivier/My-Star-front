import React from 'react';
import './star.scss';
import Ratings from 'react-ratings-declarative';

export const Modal = ({rating, setRating, show}) => {
    return (
        <div className={'star-card'}>

            <div className={'modal'}
                size="sm"
                show={show}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <div className={'modal__header closeButton'}>
                    <div className={'modal-title'} id="example-modal-sizes-title-sm">
                        Поставьте рейтинг
                    </div>
                </div>

                <div className={'modal__body'}>
                    <Ratings
                        rating={newRating}
                        widgetRatedColors="orange"
                        widgetDimensions="14px"
                        widgetSpacings="3px"
                        changeRating={setNewRating}
                    >
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                        <Ratings.Widget/>
                    </Ratings>
                    <button onClick={rateHandler}>Оценить</button>
                </div>
            </div>

        </div>
    )
}