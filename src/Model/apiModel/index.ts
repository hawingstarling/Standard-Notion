export interface ResponseModel<T> {
    status: number
    message: string;
    data: T
}

export interface DocumentModel {
    title: string
    userId?: string
    isArchived?: boolean
    parentDocumentId?: string
    content?: string
    coverImage?: string
    icon?: string
    isPublished?: boolean
}

export interface DocumentUpdateInput {
    id: string
    title?: string
    content?: string
    coverImage?: string
    icon?: string
    isPublished?: boolean
}

interface DocumentResponseModel {
    id?: string
    title: string
    userId: string
    isArchived: boolean
    // parentDocumentId?: DocumentResponseModel[]
    parentDocumentId?: string
    content?: string
    coverImage?: string
    icon?: string
    isPublished: boolean
}