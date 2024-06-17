//Models
import Activity from '../models/activity.model';
import { notificationObserver } from './notificationObserver.service';
import { Notification } from '../models/notification.model';

class DateVisitor {
    async visit(activityId: string) {
        const activity = await Activity.findById(activityId);
        if (!activity) {
            throw new Error('Activity not found');
        }

        const currentDate = new Date();
        const activityDate = new Date(activity.dateTime);
        const daysDifference = Math.floor((activityDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

        if (daysDifference <= 0 && activity.status !== 'Realized' && activity.status !== 'Canceled') {
            activity.status = 'Realized';
            await activity.save();
        } else if (daysDifference <= 1 && activity.status === 'Notified') {
            const newNotification = new Notification(
                Date.now(),
                'System',
                currentDate,
                `Activity ${activity.name} is now being realized.`,
                'UNREAD'
            );
            notificationObserver.addNotification(newNotification);
        } else if (daysDifference <= 5 && activity.status === 'Planned') {
            activity.status = 'Notified';
            const newNotification = new Notification(
                Date.now(),
                'System',
                currentDate,
                `Activity ${activity.name} is upcoming. Please prepare.`,
                'UNREAD'
            );
            notificationObserver.addNotification(newNotification);
            await activity.save();
        }
    }
}

export const dateVisitor = new DateVisitor();
