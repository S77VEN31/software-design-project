export class Notification {
    constructor(
        public id: number,
        public sender: string,
        public date: Date,
        public text: string,
        public status: 'READ' | 'UNREAD'
    ) {}
}

export default Notification;