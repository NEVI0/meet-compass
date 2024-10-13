import { useEffect, useState } from 'react';

import { useToast } from '@presentation/contexts/ToastContext';

type StreamType = MediaStream | null;

interface ParamsAbstract {
    onSuccessGettingStream: (stream: StreamType) => void;
}

export const useUserStream = (params: ParamsAbstract) => {
    const { toast } = useToast();

    const [loading, setLoading] = useState<boolean>(false);
    const [stream, setStream] = useState<StreamType>(null);

    const [isUsingVideo, setIsUsingVideo] = useState<boolean>(true);
    const [isUsingAudio, setIsUsingAudio] = useState<boolean>(true);

    const getStream = async (settings?: MediaStreamConstraints) => {
        try {
            const media = await navigator.mediaDevices.getUserMedia(settings);
            return media;
        } catch (error) {
            toast.error(
                'Você precisa permitir o navegador acessar ambos microfone e webcam para você realizar sua chamada!',
            );

            return null;
        }
    };

    const startStream = async () => {
        try {
            setLoading(true);

            const media = await getStream({
                video: true,
                audio: true,
            });

            setStream(media);
            params.onSuccessGettingStream(media);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const toggleVideo = async () => {
        try {
            if (!stream) return;

            let tempStream: StreamType = stream.clone();

            if (isUsingVideo) {
                tempStream.getVideoTracks().forEach(track => track.stop());
            } else {
                tempStream = await getStream({
                    video: true,
                    audio: isUsingAudio,
                });
            }

            setStream(tempStream);
            setIsUsingVideo(!isUsingVideo);
            params.onSuccessGettingStream(tempStream);
        } catch (error) {}
    };

    const toggleAudio = async () => {
        try {
            if (!stream) return;

            let tempStream: StreamType = stream.clone();

            if (isUsingAudio) {
                tempStream.getAudioTracks().forEach(track => track.stop());
            } else {
                tempStream = await getStream({
                    video: isUsingVideo,
                    audio: true,
                });
            }

            setStream(tempStream);
            setIsUsingAudio(!isUsingAudio);
            params.onSuccessGettingStream(tempStream);
        } catch (error) {}
    };

    useEffect(() => {
        startStream();
    }, []);

    const hasUserStream = !!stream;

    return {
        stream,
        loading,
        hasUserStream,

        isUsingVideo,
        isUsingAudio,

        toggleVideo,
        toggleAudio,
    };
};
