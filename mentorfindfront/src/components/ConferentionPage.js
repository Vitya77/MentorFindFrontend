import React, {useRef, useEffect} from 'react';

function ConferentionPage() {
    const videoRef = useRef(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing the webcam: ', err);
            }
        };

        getVideo();
    }, [videoRef]);
    return (
        <div className="conferention-page">
            <div className="user-video">
                <video ref={videoRef} autoPlay />
                <span>Username</span>
            </div>
            <div className="conferention-panel">
                <div className="conferention-panel-item">
                    <i className="fa-solid fa-microphone-slash"/>
                    <span>Вимкнути мікрофон</span>
                </div>
                <div className="conferention-panel-item">
                    <i className="fa-solid fa-video"/>
                    <span>Ввімкнути камеру</span>
                </div>
                <div className="conferention-panel-item">
                    <i className="fa-solid fa-share"/>
                    <span>Поділитись</span>
                </div>
            </div>
            <div className="leave-conferention">
                <i className="fa-solid fa-right-from-bracket"/>
                <span>Вийти</span>
            </div>
        </div>
    );
}
    
export default ConferentionPage;