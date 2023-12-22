

interface DocumentModel {
    title: string
    userId: string
    isArchived: boolean
    parentDocument?: DocumentModel[]
    content?: string
    coverImage?: string
    icon?: string
    isPublished: boolean
}

interface DocumentResponseModel {
    id?: number
    title: string
    userId: string
    isArchived: boolean
    parentDocumentId?: DocumentModel[]
    content?: string
    coverImage?: string
    icon?: string
    isPublished: boolean
}