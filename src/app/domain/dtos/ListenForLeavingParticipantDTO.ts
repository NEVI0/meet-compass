interface DataAbstract {
    name: string;
}

export interface ListenForLeavingParticipantDTO {
    onReceive(data: DataAbstract): void;
}
