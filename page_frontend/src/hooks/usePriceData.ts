import axios, { AxiosPromise } from 'axios';
import { PriceData } from '../interface/PriceData';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://localhost:4000';

const fetchData = async (): AxiosPromise<PriceData[]> => {
    const response = await axios.get(API_URL + '/prices/get/all');
    return response;
};

export function usePriceData(isChecked: boolean) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['price-data'],
        retry: 2,
    });

    const data = query.data?.data;

    const adjustedData = data?.map(priceData => {
        let adjustedPrice = 0;
        const price = priceData.price;

        if (typeof price === 'number') {
            adjustedPrice = isChecked ? price * 12 * 0.85 : price;
        } else if (typeof price === 'string') {
            const numericPrice = parseFloat((price as string).replace('R$', '').trim());
            adjustedPrice = isChecked ? numericPrice * 12 * 0.85 : numericPrice;
        }
        if (isNaN(adjustedPrice)) {
            adjustedPrice = 0;
        }

        return {
            ...priceData,
            price: adjustedPrice,
        };
    });

    return { ...query, data: adjustedData };
}
