import { Notification } from '../models/notification.model';

class NotificationObserver {
    private notifications: Notification[] = [];

    addNotification(notification: Notification) {
        this.notifications.push(notification);
        this.sortNotifications();
    }

    getNotifications(status: 'READ' | 'UNREAD' | 'ALL'): Notification[] {
        if (status === 'ALL') {
            return this.notifications;
        }
        return this.notifications.filter(notification => notification.status === status);
    }

    deleteNotification(id: number) {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
    }

    private sortNotifications() {
        this.notifications.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
}

export const notificationObserver = new NotificationObserver();