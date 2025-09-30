import axios, {AxiosError} from 'axios';

const API_URL =
  'https://catalog-management-system-stage-1064026520425.us-central1.run.app/cms/product/v2/filter/product';

interface SortOptions {
  creationDateSortOption?: 'ASC' | 'DESC';
}

interface ProductFilterRequest {
  page: number;
  pageSize: number;
  sort?: SortOptions;
}

interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  pageSize: number;
}

export const fetchProducts = async <T>(
  page: number = 1,
  pageSize: number = 10,
  sort: SortOptions = {creationDateSortOption: 'DESC'},
): Promise<ApiResponse<T> | null> => {
  try {
    const response = await axios.post<ApiResponse<T>>(
      API_URL,
      {
        page,
        pageSize,
        sort,
      } as ProductFilterRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 sec timeout
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios error:', {
        message: axiosError.message,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      });
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
};
