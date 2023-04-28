import http from "../http-common";

class FileService {
  async getFile(id: number) {
    return await http.get<Blob>(`/file/${id}`, { responseType: "blob" });
  }

  async getHTMLFile(id: number) {
    return await http.get(`/file/${id}`);
  }
}

export default new FileService();
