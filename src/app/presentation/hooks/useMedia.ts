import { useEffect, useMemo, useState } from 'react';

import { useToast } from '@app/presentation/contexts/ToastContext';

type StreamType = MediaStream | null;

interface ParamsAbstract {
    onSuccessGettingStream: (stream: StreamType) => void;
}

export const useMedia = (params?: ParamsAbstract) => {
    const { toast } = useToast();

    const [loading, setLoading] = useState<boolean>(false);

    const [localStream, setLocalStream] = useState<StreamType>(null);
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

            setLocalStream(media);

            if (params) params.onSuccessGettingStream(media);
        } catch (error) {
            toast.error('Could not access video and audio!');
        } finally {
            setLoading(false);
        }
    };

    const toggleVideo = async () => {
        try {
            if (!localStream) return;

            let tempStream: StreamType = localStream.clone();

            if (isUsingVideo) {
                tempStream.getVideoTracks().forEach(track => track.stop());
            } else {
                tempStream = await getStream({
                    video: true,
                    audio: isUsingAudio,
                });
            }

            setLocalStream(tempStream);
            setIsUsingVideo(!isUsingVideo);

            if (params) params.onSuccessGettingStream(tempStream);
        } catch (error) {}
    };

    const toggleAudio = async () => {
        try {
            if (!localStream) return;

            let tempStream: StreamType = localStream.clone();

            if (isUsingAudio) {
                tempStream.getAudioTracks().forEach(track => track.stop());
            } else {
                tempStream = await getStream({
                    video: isUsingVideo,
                    audio: true,
                });
            }

            setLocalStream(tempStream);
            setIsUsingAudio(!isUsingAudio);

            if (params) params.onSuccessGettingStream(tempStream);
        } catch (error) {}
    };

    useEffect(() => {
        startStream();
    }, []);

    const hasUserStream = !!localStream;

    return {
        startStream,

        localStream,
        loading,
        hasUserStream,

        isUsingVideo,
        isUsingAudio,

        toggleVideo,
        toggleAudio,
    };
};
