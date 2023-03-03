import Image from "next/image";
import { Course } from "@/services/course-service";
import { Chip } from "@material-ui/core";
import { Category } from "@/services/category-service";
import Link from "next/link";


interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  console.log(course);
  const APINEMBAK = "/api/file";
  const imageLoader = ({ src }: { src: string }): string => {
    return `${src}`;
  };
  
  return (
    <Link href="/">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden aspect-w-16 aspect-h-9 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-lg">
        <div className="relative h-64 bg-slate-50">
          <Image
            fill
            src={
              course.__thumbnail__
                ? `${APINEMBAK}/${course.__thumbnail__.id}`
                : "https://source.unsplash.com/random"
            }
            alt="course thumbnail"
            loader={imageLoader}
            className="absolute top-0 left-0 w-full h-full object-contain object-center"
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{course.title}</div>
          <p className="text-gray-700 text-base">{course.description}</p>
        </div>
        <div className="px-6 py-4 flex items-center justify-between">
          <span className="inline-block bg-gray-200 rounded-lg px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
            {course.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
