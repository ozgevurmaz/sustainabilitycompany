import { ActivityType } from '@/lib/types/types'
import { FileText, Settings, MessageSquare, FileType, UserCog } from 'lucide-react'
import React from 'react'

const ActivityCard = ({ activity }: { activity: ActivityType }) => {

    const FindIcon = () => {
        if (activity.type === "blog") {
            return (
                <FileText className="h-4 w-4 text-green-600" />
            )
        } else if (activity.type === "category") {
            return (
                <FileType className='h-4 w-4 text-orange-600' />
            )
        } else if (activity.type === "service") {
            return (
                <Settings className="h-4 w-4 text-blue-600" />
            )
        } else if (activity.type === "settings") {
            return (
                <UserCog className="h-4 w-4 text-pink-600" />
            )
        } else {
            return (
                <MessageSquare className="h-4 w-4 text-purple-600" />
            )
        }
    }

    const calculateTimeAgo = () => {
        const now = new Date().getTime();
        const activityTime = new Date(activity.createdAt).getTime();

        if (isNaN(activityTime)) return "Invalid date";

        const diffTime = now - activityTime;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffDays === 0) {
            if (diffHours === 0) {
                if (diffMinutes === 0) {
                    return 'Just now';
                }
                return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
            }
            return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else {
            return `${diffDays} days ago`;
        }
    };

    return (
        <div className="flex items-start">
            <div className={`h-8 w-8 rounded-full ${activity.type === "testimonial" ? "bg-purple-100" : activity.type === "service" ? "bg-blue-100" : activity.type === "category" ? "bg-orange-100" : activity.type === "settings" ? "bg-pink-100" : "bg-green-100"} flex items-center justify-center mr-3`}>
                {FindIcon()}
            </div>
            <div>
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-gray-500">{calculateTimeAgo()}</p>
            </div>
        </div>
    )
}

export default ActivityCard