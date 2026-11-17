"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Chrono } from "react-chrono";
import { activityTrail } from "@/types/visitor";
import UserJourneyFlow from "@/app/admin/(routes)/reports/total-buy-now-clicks/_components/UserJourneyFlow";

interface UserFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityTrail: activityTrail[];
}

const UserFlowModal = ({
  isOpen,
  onClose,
  activityTrail,
}: UserFlowModalProps) => {
  // Sort activity trail based on createdAt (assuming it is timestamped)
  const sortedActivityTrail = activityTrail.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const timelineData = sortedActivityTrail.map((activity) => ({
    title: activity.eventType,
    cardTitle: activity.pageUrl
      ? "Page View"
      : activity.plan
      ? "Plan Interest"
      : "Other",
    cardSubtitle: new Date(activity.createdAt).toLocaleString(),
    cardDetailedText: activity.pageUrl
      ? `Visited: ${activity.pageUrl}`
      : activity.plan
      ? `Plan: ${activity.plan.name}`
      : "Other event details",
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-webprimary rounded-lg p-6 md:p-8 w-full max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-center text-webprimary text-2xl font-bold">
            User Journey Flow
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* {activityTrail.length > 0 ? (
            <Chrono
              items={timelineData}
              mode="HORIZONTAL"
              slideShow
              theme={{
                primary: "#e12809", // Red color for primary elements
                secondary: "#f3f3f3",
                textColor: "#e12809", // Changed text color to red
              }}
              itemWidth={300}
            />
          ) : (
            <p className="text-white text-lg">No activity found.</p>
          )} */}
        </div>
        <div className="flex justify-center items-center space-x-4">
          <UserJourneyFlow />
        </div>

        <DialogFooter className="flex justify-center items-center space-x-4">
          <Button
            onClick={onClose}
            className="w-full md:w-auto border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserFlowModal;
