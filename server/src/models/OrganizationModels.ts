export type OrganizationModel = {
    id: number;
    title: string;
    place?: string;
    email?: string;
    tel?: string;
    additional?: string;
}

export type OrganizationDtoModel = {
    id: number;
    title: string;
    place?: string;
    email?: string;
    tel?: string;
    additional?: string;
}

export type OrganizationCreateModel = {
    title: string;
    place?: string;
    email?: string;
    tel?: string;
    additional?: string;
}

export type OrganizationUpdateModel = {
    id: number;
    title?: string;
    place?: string;
    email?: string;
    tel?: string;
    additional?: string;
}
