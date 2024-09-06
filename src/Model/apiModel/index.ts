

interface DocumentModel {
    title: string
    userId?: string
    isArchived?: boolean
    // parentDocument?: DocumentModel[]
    parentDocumentId?: string
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