
export interface templateCreateRequest {
    name: string
    status: string
    tags: string
    thumb: undefined
}

export interface templateFilterParams {
    name: string
    status: string
    tags: string
    page: number
    pageSize: number
}

export interface templateAllResponse {
    template_id: string
    name: string
    status: string
    tags: string
    thumbUrl: string
    thumb: string
    created_at: string
    updated_at: string
}


