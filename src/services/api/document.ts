import axios from "axios"
import { toast } from "sonner"

const BASE_DEV: string = 'http://localhost:3000/api/v1'

export const CreateNewDocument = async function (document: DocumentModel) {
    try {
        let promise = axios.post<DocumentResponseModel>(`${BASE_DEV}/document`, document)

        return promise
    } catch (error) {
        console.log(error);
    }
}

export const GetAllDocuments = async function () {
    try {
        let { data } = await axios.get<DocumentResponseModel>(`${BASE_DEV}/document`)
        console.log(data);
        
        return data
    } catch (error) {
        console.log(error);
    }
}