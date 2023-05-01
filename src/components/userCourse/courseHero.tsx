import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

type Props = {
  title: string;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
};

const Hero: React.FC<Props> = ({ title, breadcrumbs }) => {
  return (
    <div className="py-4 mb-4">
      <div className="container mx-auto">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => (
            <Link color="inherit" href={breadcrumb.href} key={index}>
              {breadcrumb.label}
            </Link>
          ))}
        </Breadcrumbs>

        <Typography
          variant="h3"
          component="h1"
          className="font-bold mt-2 relative"
          style={{ minHeight: "6rem" }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover rounded-2xl"
            style={{
              backgroundImage: "url(https://picsum.photos/1920/1080)",
              opacity: 0.6,
            }}
          />
          <div className="flex items-center">
            <span
              className="relative font-semibold z-10 mt-5 ml-20 text-white"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              {title}
            </span>
          </div>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ mixBlendMode: "overlay", backgroundColor: "#1a202c" }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default Hero;
