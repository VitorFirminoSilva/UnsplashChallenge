import { CancelToken } from "axios";
import { api } from "../axios";
import { Image } from "../models";

interface optionsParams{
    page?: number,
    size?: number
}


export const fetchManyImage = (
    tokenSource: CancelToken,
    userId: number,
    options?: optionsParams
): Promise<{images: Image[]; totalCount: number}> => {
    return new Promise((resolve, reject) => {

        const params = {
            page: options?.page,
            size: options?.size
        };

        api.get<Image[]>(`/images/${userId}`)
        .then(( response ) => {

            if(response){
                const data = response.data;
                //const totalCount = response.headers['x-total-count'];
                const images: Image[] = data.map((e) => {
                    return {
                        id: e.id,
                        imageURL: e.imageURL,
                        label: e.label
                    };
                });
                resolve({images, totalCount: 10});
            }

            resolve({
                images: [],
                totalCount: 0
            });
        }).catch((err) => {
            reject(err);
        });
    });
}