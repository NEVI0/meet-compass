export interface RequestMeetAccessDTO {
    user: string;
    email: string;
    meet: {
        id: string;
    };
    signal: any;
}
