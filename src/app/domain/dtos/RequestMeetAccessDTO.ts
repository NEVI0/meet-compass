export interface RequestMeetAccessDTO {
    meet: {
        id: string;
    };
    participant: {
        name: string;
        email: string;
    };
}
