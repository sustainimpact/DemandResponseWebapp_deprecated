import { AllEvents }  from 'src/app/DataModels/AllEvents';

export class AllEventSets {
    eventSetId?: number;
    name?: string;
    dateOfOccurrence?: string;
    status?: number;
    plannedPower?: number;
    committedPower?: number;
    actualPower?: number;
    totalPrice?: number;
    publishedEvents?: number;
    completedEvents?: number;
    cancelledEvents?: number;
    dsoId?:  number;
    uploadTime?: string;
    version?: number;
    activeStatus?: boolean;
    events?: AllEvents[];
}