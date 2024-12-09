import { useQuery } from '@tanstack/react-query';
import { getWebsiteDetails } from '@services/api/websiteApi';

export const useWebsiteDetails = (id: string) => {
    console.log(id)
    // return useQuery({queryKey: ['websiteDetails', id], queryFn: () => getWebsiteDetails(id), {
    //     enabled: !!id, // Ensure the query runs only when `id` exists
    // }});
    return useQuery({queryKey: ['websiteDetails', id], queryFn: () => getWebsiteDetails(id)})
};
