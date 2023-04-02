import http from "../http-common";

class JobsService {
  async getStatus(jobsId: number) {
    const response = await http.get(`/jobs/${jobsId}`);
    return response.data;
  }

  async runJobs(data: any) {
    const response = await http.post("/jobs", data);
    return response.data;
  }
}

export default new JobsService();