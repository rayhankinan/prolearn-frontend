import Image from "next/image";
import { Course } from "@/services/course-service";
import { Chip } from "@material-ui/core";
import { Category } from "@/services/category-service";

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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden aspect-w-16 aspect-h-9">
      <div className="relative h-64">
        <Image
          fill
          src={
            course.__thumbnail__
              ? `${APINEMBAK}/${course.__thumbnail__.id}`
              : "https://source.unsplash.com/random"
          }
          alt="course thumbnail"
          loader={imageLoader}
          sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base">{course.description}</p>
        {/* <div className="mt-4 flex flex-wrap">
          {course.__categories__.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              className="mr-2 mb-2"
            />
          ))}
        </div> */}
      </div>
      <div className="px-6 py-4 flex items-center justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {course.difficulty}
        </span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
