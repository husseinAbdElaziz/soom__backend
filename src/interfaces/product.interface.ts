import { ObjectId } from 'mongoose';

export enum CLASSIFICATIONS {
    SALE = 'sale',
    RENT = 'rent'
}



export interface ProductI {
    _id: ObjectId,
    ownerId: ObjectId,
    lastBidId: ObjectId,
    name: string,
    country: string,
    city: string,
    district: string,
    category: string,
    video: string,
    images: FileI[],
    description: string,
    isDeal: boolean,
    classification: CLASSIFICATIONS,
    dealStartDate: Date | any,
    dealEndDate: Date | any,
    areaInSquarMeters: number,
    streets: number,
    apartments: number,
    age: number,
    rooms: number,
    portableHeight: number,
    portableType: string,
    model: number,
    poetryTent: boolean,
    wells: string,
    trees: string,
    bedRooms: number,
    livingRooms: number,
    bathrooms: number,
    halls: number,
    boards: number,
    maidRoom: boolean,
    kitchens: number,
    furnished: boolean,
    tiers: number,
    carEntrance: boolean,
    aircondition: boolean,
    elevator: boolean,
    realEstateType: string,
    swimmingPool: boolean,
    footballCourt: boolean,
    volleyballCourt: boolean,
    childrenGames: boolean,
    familiesSection: boolean,
    outdoor: boolean,
    basement: boolean,
    driverRoom: boolean,
    stairs: boolean,
    guestRooms: number,
    salePriceLimit: number,
    initialPrice: number,
    isSoldOut: boolean,
    dealStatus: number,
    createdAt: Date;
    updatedAt: Date;

}

export interface FileI {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number,
}


export interface SearchQueryI extends ProductI {
    sortBy: string;
    page: number;
    limit: number;
}