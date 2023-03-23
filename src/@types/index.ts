export interface Root {
    data: Data
}

export interface Data {
    Page: Page
}

export interface Page {
    pageInfo: PageInfo
    media: Medum[]
}

export interface PageInfo {
    total: number
    currentPage: number
    lastPage: number
    hasNextPage: boolean
    perPage: number
}

export interface Medum {
    id: number
    title: Title
    externalLinks: ExternalLink[]
}

export interface Title {
    native: string
}

export interface ExternalLink {
    site: string
    url: string
}
