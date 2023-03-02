import React from "react";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";

type Props = {
  title: string;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
};

const Hero: React.FC<Props> = ({ title, breadcrumbs }) => {
  return (
    <div className="py-4">
      <div className="container mx-auto">
        <Breadcrumbs aria-label="breadcrumb">
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
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url(https://picsum.photos/1920/1080)",
              opacity: 0.8,
              filter: "blur(2px)",
            }}
          />
          <div className="flex items-center">
            <span
              className="relative custom-Source-Code-Pro z-10 mt-5 ml-10 text-white"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              {title}
            </span>
          </div>
          <div
            className="absolute inset-0 bg-blue-600 opacity-60"
            style={{ mixBlendMode: "color" }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default Hero;
