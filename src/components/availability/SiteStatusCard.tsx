import React from "react";
import { PauseCircle, XCircle, Slash, Circle, CircleSlash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteStatus } from "@/api/storeApi";
import { IconRadixIconsDotFilled } from "../icons/dot";

type StoreStatusProps = {
    status: SiteStatus;
    details?: string; // Optional description for each status
};

const statusConfig = {
    [SiteStatus.OPEN]: {
        icon: <IconRadixIconsDotFilled className="text-green-700" height={24} width={24} />,
        title: "Open",
        description: "Store is open and receiving orders",
    },
    [SiteStatus.PAUSED]: {
        icon: <PauseCircle className="text-yellow-600" size={24} />,
        title: "Paused",
        description: "Store is paused during regular business hours and not receiving orders",
    },
    [SiteStatus.CLOSED]: {
        icon: <CircleSlash2 className="text-red-500" size={24} />,
        title: "Closed",
        description: "Store is not receiving orders",
    },
    [SiteStatus.INACTIVE]: {
        icon: <Slash className="text-gray-500" size={24} />,
        title: "Inactive",
        description: "Store is inactive and not receiving orders",
    },
};

export const SiteStatusCard: React.FC<StoreStatusProps> = ({ status, details }) => {
    const statusInfo = statusConfig[status];

    const textColor = status === SiteStatus.PAUSED ? "text-yellow-600" : status === SiteStatus.OPEN ? "text-green-700" : "text-gray-900";
    const titleClassName = `flex items-center space-x-2 text-xl font-semibold ${textColor}`;
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="text-3xl">{statusInfo.icon}</div>
                    <div className={titleClassName}>
                        {statusInfo.title}
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-600">{statusInfo.description}</p>
                </div>
            </div>
            <div>
                <p className="font-semibold text-base">
                    {details}
                </p>
            </div>
        </div>
    );
};
