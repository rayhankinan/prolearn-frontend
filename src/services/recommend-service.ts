
import http from "../http-common"
class RecommendService {
  async getRecommendation(){
    return await http.get('/recommendation/collaborative')
    
  }

}

export default new RecommendService