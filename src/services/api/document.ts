import axios, { AxiosResponse } from 'axios';
import { Document } from '@prisma/client';
import { SuccessResponseWithMsg } from '@/core/ApiResponse';
import { DocumentModel, DocumentUpdateInput, ResponseModel } from '@/Model/apiModel';

const BASE_DEV: string = 'http://localhost:3000/api/v1';

export const CreateNewDocument = async function (
  document: DocumentModel,
): Promise<Document> {
  try {
    let { data } = await axios.post<ResponseModel<Document>>(`${BASE_DEV}/document`, document);

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const GetSidebar = async function (
  id: string | null = null,
): Promise<Document[]> {
  try {
    let { data } = await axios.get<ResponseModel<Document[]>>(`${BASE_DEV}/document`, {
      params: {
        parentDocumentId: id,
      },
    });

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const GetSearch = function (
  id: string | null = null,
): Promise<AxiosResponse<SuccessResponseWithMsg<Document[]>>> {
  try {
    return axios.get<SuccessResponseWithMsg<Document[]>>(`${BASE_DEV}/document/search`);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const Archive = async function (
  id: string,
): Promise<Document> {
  try {
    let { data } = await axios.put<ResponseModel<Document>>(`${BASE_DEV}/document/archive`, null, {
      params: {
        id: id,
      },
    });

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const GetTrash = async function (): Promise<Document[]> {
  try {
    let { data } = await axios.get<ResponseModel<Document[]>>(`${BASE_DEV}/document/trash`);

    const response = data.data

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const Restore = async function (
  id: string,
): Promise<Document> {
  try {
    let { data } = await axios.put<ResponseModel<Document>>(`${BASE_DEV}/document/restore`, null, {
      params: {
        id,
      },
    });

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const Remove = async function (
  id: string,
): Promise<Document> {
  try {
    let { data } = await axios.delete<ResponseModel<Document>>(`${BASE_DEV}/document/${id}`);

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const GetById = async function (
  id: string
): Promise<Document> {
  try {
    let { data } = await axios.get<ResponseModel<Document>>(`${BASE_DEV}/document/${id}`);

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export const UpdateDocument = async function (
  body: DocumentUpdateInput
): Promise<Document> {
  try {
    let { data } = await axios.put<ResponseModel<Document>>(`${BASE_DEV}/document`, body);

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export const RemoveIcon = async function (
  id: string
): Promise<Document> {
  try {
    let { data } = await axios.put<ResponseModel<Document>>(`${BASE_DEV}/document/remove-icon?id=${id}`);

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export const RemoveCoverImage = async function (
  id: string
): Promise<Document> {
  try {
    let { data } = await axios.put<ResponseModel<Document>>(`${BASE_DEV}/document/remove-cover-image?id=${id}`);

    const response = data.data;

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}