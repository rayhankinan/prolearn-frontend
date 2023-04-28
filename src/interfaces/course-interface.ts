interface thumbnail {
  id: number;
  name: string;
}
interface Course {
  id?: number;
  title: string;
  description: string;
  difficulty: string;
  rating_avg: number;
  __categories__: number[];
  status: string;
  imgFile?: File | null;
  __thumbnail__?: thumbnail;
}

export default Course;
