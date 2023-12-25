

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
    id?: string
    title: string
    userId: string
    isArchived: boolean
    parentDocumentId?: DocumentResponseModel[]
    content?: string
    coverImage?: string
    icon?: string
    isPublished: boolean
}