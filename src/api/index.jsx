import { httpClient } from "./http";

export const api = {
    $get: async(url,config) => (await httpClient.get(url,config)),
    $post: async(url,config) => (await httpClient.post(url,config)),
    $put: async(url,config) => (await httpClient.put(url,config)),
    $delete: async(url,config) => (await httpClient.delete(url,config)),
}