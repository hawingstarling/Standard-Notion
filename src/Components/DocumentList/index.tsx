import type { Document } from '@prisma/client'
import { ObjectId } from 'mongodb';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { GetSidebar } from '../../services/api/document';
import Item from '../Item';
import { FileIcon } from 'lucide-react';

interface DocumentListProps {
    parentDocumentId?: string,
    level?: number,
    data?: Document[]
}

function DocumentList({
    parentDocumentId,
    level = 0,
}: DocumentListProps) {
    const params = useParams()
    const router = useRouter()
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
    const [documents, setDocuments] = React.useState<DocumentResponseModel[]>([]);

    const onExpanded = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    }

    async function FetchApiDocuments() {
        let result = await GetSidebar(parentDocumentId)
        console.log('documents ', result);
        setDocuments(result)
    }

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    React.useEffect(() => {
        FetchApiDocuments()
    }, [])

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }

    return ( 
        <>
            <p
                style={{
                    paddingLeft: level ? `${(level * 12) +25}px` : undefined
                }}
                className={`hidden text-sm font-medium text-muted-foreground/80 ${expanded && "last:block"} ${level === 0 && "hidden"}`}
            >
                No pages inside
            </p>
            {documents &&
                documents.map((document) => (
                    <div key={document?.id}>
                        <Item 
                            id={document?.id} 
                            onClick={() => onRedirect(document?.id)}
                            label={document.title}
                            icon={FileIcon}
                            documentIcon={document.icon}
                            active={params.documentId === document.id}
                            level={level}
                            onExpand={() => onExpanded(document.id)}
                            expanded={expanded[document.id]}
                        />
                        {expanded[document.id] && (
                            <DocumentList 
                                parentDocumentId={document.id}
                                level={level + 1}
                            />
                        )}
                    </div>
                ))
            }
        </>
    );
}

export default DocumentList;