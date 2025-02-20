import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useToast } from '@app/presentation/contexts/ToastContext';

export const useCopyMeetLink = () => {
    const { meet } = useMeet();
    const { toast } = useToast();

    const copyLink = async () => {
        try {
            if (!meet) return;

            const link = `${window.origin}/home?meetId=${meet.id}`;
            await navigator.clipboard.writeText(link);

            toast.success('Link copiado com sucesso!');
        } catch (error) {
            toast.error('Não foi possível copiar o linm da reunião!');
        }
    };

    return { copyLink };
};
