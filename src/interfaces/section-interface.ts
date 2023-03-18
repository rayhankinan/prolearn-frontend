import Course  from './course-interface';

interface Section {
    id?: number;
    title: string;
    objective?: string;
    duration: number;
    type: string;
    file?: File|null;
    adjoinedCourse?: Course|null;
    quiz? : string;
    children?: Section[];
    parent?: Section|null;
}

export default Section;
