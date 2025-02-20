export interface CreateMeetDTO {
    meet: {
        name: string;
    };
    owner: {
        name: string;
        email: string;
    };
}
