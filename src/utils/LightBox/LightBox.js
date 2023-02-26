import React, { useState } from "react";
import Lightbox from "react-18-image-lightbox";


export default function LightBox({ image, email, sender, text }) {
    const [isOpen, setIsOpen] = useState(false);

    const onClickHandler = () => {
        setIsOpen(true);
    };
    const onClickHandlerClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <img
                className={`w-[250px] object-contain ${email === sender.email ? 'mr-8 xxs:mr-6' : 'ml-8 xxs:ml-6'} ${text ? 'rounded-t-lg' : 'rounded-lg'} cursor-pointer hover:opacity-80 transition-all ease-in-out`}
                src={image} type="button" onClick={onClickHandler} alt="" />
            {isOpen && (
                <Lightbox
                    mainSrc={image}
                    onCloseRequest={onClickHandlerClose}
                />
            )}
        </div>
    );
}
