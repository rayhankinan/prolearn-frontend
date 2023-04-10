import Course from "./course-interface";

interface file {
  id: number;
  name: string;
}
interface Section {
  id?: number;
  title: string;
  objective?: string;
  duration: number;
  type: string;
  file?: File | null;
  __file__?: file;
  adjoinedCourse?: Course | null;
  quiz?: string;
  children?: Section[];
  parent?: Section | null;
}

export default Section;
