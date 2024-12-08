export interface WebsiteInfo {
    name: string;
    url: string;
    createdAt: string;
    owner: string;
}

export interface VMConfig {
    cpu: number;
    ram: number;
    disk: number;
    os: string;
}

export interface WebsiteDetails {
    websiteInfo: WebsiteInfo;
    vmConfig: VMConfig;
}
